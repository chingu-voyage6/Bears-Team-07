const bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

/**
 * List Users
 */
exports.list = (req, h) => {
  return User.find({}).then((users) => {
    return {
      users: users
    };
  }).catch((err) => {
    return {
      err: err
    };
  });
}

/**
 * Get User by ID
 */
exports.get = (req, h) => {
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
    if (!user) return {
      message: 'User not Found'
    };
    return {
      user: user
    };
  }).catch((err) => {
    return {
      err: err
    };
  });
}


/**
 * POST a User
 */
exports.create = (req, h) => {
  var userData = {
    name: req.payload.name,
    surname: req.payload.surname,
    email: req.payload.email,
    password: req.payload.password
  };
  bcrypt.hash(req.payload.password, null, null, (err, hash) => {
    userData.password = hash;
  });
  console.log("USER: " + userData);
  return User.create(userData).then((user) => {
    return {
      message: "User created successfully",
      user: user
    };
  }).catch((err) => {
    return {
      err: err
    };
  });
}

/**
 * PUT | Update User by ID
 */
exports.update = (req, h) => {
  console.log("UPDATE/put: " + req.params.id);
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
    if (!user) return {
      err: 'User not found'
    };
    user.name = req.payload.name;
    user.surname = req.payload.surname;
    user.email = req.payload.email;
    bcrypt.hash(req.payload.password, null, null, (err, hash) => {
      user.password = hash;
      user.save();
    });
    return {
      message: "User data updated successfully",
      user: user
    };
  }).catch((err) => {
    return {
      err: err
    };
  });
}

/**
 * Delete User by ID
 */
exports.remove = (req, h) => {
  return User.findOne({
    userId: req.params.id
  }).then((user) => {
    if (!user) return {
      err: 'User not found'
    };
    return user.remove();
  }).catch((err) => {
    return {
      err: err
    };
  });
}
