'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var User = require('../../models/user');
var jwt = require('../../services/jwt');

export class Controller {

  login(req, res) {
    console.log("login");
    var params = req.body;
    var password = params.password;
    var email = params.email;

    User.findOne({
      email: email.toLowerCase()
    }, function (err, user) {
      if (err) {
        res.status(500)
          .send({
            message: 'Error entering data.'
          });
      } else {
        if (!user) {
          res.status(404)
            .send({
              message: 'The user does not exist.'
            });
        } else {
          //Comprobar contraseña
          bcrypt.compare(password, user.password, function (err, check) {
            if (check) {
              //Devolver los datos del usuario logeado
              if (params.gethash) {
                //Devolver un token de jwt
                res.status(200)
                  .send({
                    token: jwt.createToken(user)
                  });
              } else {
                res.status(200)
                  .send({
                    user
                  });
              }
            } else {
              res.status(404)
                .send({
                  message: 'The user cannot login at this time.'
                });
            }
          });
        }
      }
    });
  }
}
export default new Controller();
