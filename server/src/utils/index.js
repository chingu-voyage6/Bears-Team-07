const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

exports.verifyUniqueUser = (req, res) => {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({
    $or: [{
      email: req.payload.email
    }, {
      username: req.payload.username
    }]
  }, (err, user) => {
    // Check whether the username or email
    // is already taken and error out if so
    if (user) {
      if (user.username === req.payload.username) {
        return {
          message: 'Username taken'
        };
      }
      if (user.email === req.payload.email) {
        return {
          message: 'Email taken'
        };
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    return {
      payload: req.payload
    };
  });
};

exports.verifyCredentials = (req, res) => {
  const password = req.payload.password;
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({
    $or: [{
      email: req.payload.email
    }, {
      username: req.payload.username
    }]
  }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          return {
            user: user
          };
        } else {
          return {
            message: 'Incorrect password!'
          };
        }
      });
    } else {
      return {
        message: 'Incorrect username or email!'
      };
    }
  });
};

exports.hashPassword = (password, cb) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

exports.CORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
};
