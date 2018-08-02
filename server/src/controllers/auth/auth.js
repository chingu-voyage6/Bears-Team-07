import bcrypt from 'bcrypt-nodejs';
import { findOne } from '../../models/user';
import { createToken } from '../../services/jwt';

/**
 * Login User
 */
exports.login = (req, res) => {
  req.log.debug('POST/Auth/login');
  const email = req.body.email;
  const password = req.body.password;
  return findOne({
    email: email.toLowerCase(),
  }).then(user => {
    if (!user) {
      res.status(404)
        .send({
          message: `No account found for ${email}`,
        });
    } else {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          res.status(200)
            .send({
              login: true,
              user,
              token: createToken(user),
            });
        } else {
          res.status(400)
            .send({
              login: false,
              message: 'Email or Password is wrong!',
            });
        }
        if (err) {
          req.log.error(err);
          res.status(500)
            .send({
              message: err,
            });
        }
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
