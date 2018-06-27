const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');
const jwt = require('../services/jwt');
const User = require('../models/user');

/**
 * Login User
 */
exports.login = (req, h) => {
  console.log('login');
  const email = req.payload.email;
  const password = req.payload.password;
  return User.findOne({
    email: email.toLowerCase()
  }).then((user) => {
    if (!user) {
      console.log("did not find " + email + " in database.");
      return new Promise(function(resolve, reject) {
        resolve({
          login: false,
          message: "No account found for " + email
        });
      });
    } else {
      console.log("found user.password: " + user.password + " and pass.password: " + password);
      return new Promise(function(resolve, reject) {
        bcrypt.compare(password, user.password, function(err, check) {
          console.log("CHECK: " + check);
          console.log("ERR: " + err);
          if (check) {
            resolve({
              login: true,
              token: jwt.createToken(user)
            });
          } else {
            resolve({
              login: false,
              message: "Email or Password is wrong!"
            });
          }
          if (err) {
            reject({
              err: err
            });
          }
        });
      });
    }

  }).catch((err) => {
    return {
      err: err
    };
  });
}
