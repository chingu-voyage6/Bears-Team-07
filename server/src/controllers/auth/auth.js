const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');
const User = require('../../models/user');
const jwt = require('../../services/jwt');

/**
 * Login User
 */
exports.login = (req, res) => {
  console.log('POST/login');
  const email = req.body.email;
  const password = req.body.password;
  return User.findOne({
    email: email.toLowerCase()
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({
          message: "No account found for " + email
        });
    } else {
      bcrypt.compare(password, user.password, function(err, check) {
        if (check) {
          res.status(200)
            .send({
              login: true,
              token: jwt.createToken(user)
            });
        } else {
          res.status(200)
            .send({
              login: false,
              message: "Email or Password is wrong!"
            });
        }
        if (err) {
          res.status(500)
            .send({
              message: err
            });
        }
      });
    }

  }).catch((err) => {
    res.status(500)
      .send({
        message: err,
      });
  });
}
