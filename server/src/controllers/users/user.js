import bcrypt from 'bcrypt-nodejs';
import User from '../../models/user';
import jwt from '../../services/jwt';

/**
 * List Users
 */
exports.list = (req, res) => {
  req.log.debug('GET/User/list');
  return User.find({}).populate('puffs').then(users => {
    if (!users) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    } else {
      res.status(200)
        .send({
          users,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * Get User by ID
 */
exports.get = (req, res) => {
  req.log.debug('GET/User/get');
  return User.findOne({
    _id: req.params.id,
  }).populate('puffs').then(user => {
    if (!user) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    } else {
      res.status(200)
        .send({
          user,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * POST a User
 */
exports.create = (req, res) => {
  req.log.debug('POST/User/create');
  let userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  };
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    userData.password = hash;
    return User.create(userData).then(user => {
      res.status(200)
        .send({
          message: 'User created successfully',
          user,
          token: jwt.createToken(user),
        });
    }).catch(err => {
      req.log.error(err);
      res.status(500)
        .send({
          message: err,
        });
    });
  });
};

/**
 * PUT | Update User by ID
 */
exports.update = (req, res) => {
  req.log.debug('PUT/User/update');
  return User.findOne({
    _id: req.params.id,
  }).then(user => {
    if (!user) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    } else {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.username = req.body.username;
      user.email = req.body.email;
      user.admin = req.body.admin;
      let update = false;
      if (user.password === req.body.password) {
        user.password = req.body.password;
        update = true;
      } else {
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
          if (err) {
            req.log.error(err);
            update = false;
            res.status(500)
              .send({
                message: err,
              });
          }
          user.password = hash;
          update = true;
        });
      }
      if (update) {
        user.save();
        res.status(200)
          .send({
            message: 'User data updated successfully',
            user,
          });
      }
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};

/**
 * Delete User by ID
 */
exports.remove = (req, res) => {
  req.log.debug('DELETE/User/remove');
  return User.findOne({
    _id: req.params.id,
  }).then(user => {
    if (!user) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    } else {
      user.remove();
      res.status(200)
        .send({
          message: 'User removed successfully',
          user,
        });
    }
  }).catch(err => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
};