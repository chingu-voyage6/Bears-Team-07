import bcrypt from 'bcrypt-nodejs';
import fs from 'fs';
import path from 'path';
import User from '../../models/user';
import jwt from '../../services/jwt';

export class Controller {
  login(req, res) {
    console.log('login');
    const params = req.body;
    const password = params.password;
    const email = params.email;

    User.findOne({
        email: email.toLowerCase(),
      },
      (err, user) => {
        if (err) {
          res.status(500)
            .send({
              message: 'Error entering data.',
            });
        } else if (!user) {
          res.status(404)
            .send({
              message: 'The user does not exist.',
            });
        } else {
          // Comprobar contraseña
          bcrypt.compare(password, user.password, (err, check) => {
            if (check) {
              // Devolver los datos del usuario logeado
              if (params.gethash) {
                // Devolver un token de jwt
                res.status(200)
                  .send({
                    token: jwt.createToken(user),
                  });
              } else {
                res.status(200)
                  .send({
                    user,
                  });
              }
            } else {
              res.status(404)
                .send({
                  message: 'The user cannot login at this time.',
                });
            }
          });
        }
      },
    );
  }
}
export default new Controller();
