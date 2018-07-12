const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');
const User = require('../../models/user');
const jwt = require('../../services/jwt');

/**
 * Login User
 */
exports.login = (req, res) => {
  req.log.debug('POST/Auth/login');
  const email = req.body.email;
  const password = req.body.password;
  //
  // console.log('--------------------------------------------------');
  // console.log(req.body);
  // console.log('--------------------------------------------------');
  // console.log('I like nanan');
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
              user: user,
              token: jwt.createToken(user)
            });
        } else {
          res.status(400)
            .send({
              login: false,
              message: 'Email or Password is wrong!',
              error: 'Email or Password is wrong!',
            });
        }
        if (err) {
          req.log.error(err);
          res.status(500)
            .send({
              message: err
            });
        }
      });
    }

  }).catch((err) => {
    req.log.error(err);
    res.status(500)
      .send({
        message: err,
      });
  });
}
