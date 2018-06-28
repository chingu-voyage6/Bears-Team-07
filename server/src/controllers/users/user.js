const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/user');
const jwt = require('../../services/jwt');
const {
  hashPassword
} = require('../../utils/util');

/**
 * List Users
 */
exports.list = (req, res) => {
  console.log("GET/list");
  return User.find({}).select('-password -__v').then((users) => {
    if (!users) {
      res.status(404)
        .send({
          message: 'No data found',
        });
    } else {
      res.status(200)
        .send({
          users: users,
        });
    }
  }).catch((err) => {
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
  console.log("GET/get");
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    }
    else {
      res.status(200)
        .send({
          user: user,
        });
    }
  }).catch((err) => {
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
  console.log("POST/create");
  var userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin
  };
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    userData.password = hash;
    return User.create(userData).then((user) => {
      res.status(200)
        .send({
          message: "User created successfully",
          user: user,
          token: jwt.createToken(user)
        });
    }).catch((err) => {
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
  console.log("PUT/update");
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
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
      bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if (err) {
          res.status(500)
            .send({
              message: err,
            });
        }
        user.password = hash;
        user.save();
      });
      res.status(200)
        .send({
          message: "User data updated successfully",
          user: user
        });
    }
  }).catch((err) => {
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
  console.log("DELETE/remove");
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({
          message: 'User not Found',
        });
    } else {
      user.remove();
      res.status(200)
        .send({
          message: "User removed successfully",
          user: user
        });
    }
  }).catch((err) => {
    return {
      err: err
    };
  });
};
