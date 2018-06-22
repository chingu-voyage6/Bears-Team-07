'use strict'

var bcrypt  = require('bcrypt-nodejs');
var fs      = require('fs');
var path    = require('path');
var User    = require('../../models/user');
var jwt     = require('../../services/jwt');

export class Controller {

  save(req, res)
  {
    var user = new User();

    var params = req.body;
    console.log(params); //Debug

    user.name       = params.name;
    user.surname    = params.surname;
    user.email      = params.email;
    user.role       = 'ROLE_ADMIN';
    user.image      = 'null';

    //1.Encrypt password
    if (params.password)
    {
        //Encrypt password and save the data
        bcrypt.hash(params.password, null,null, function (err, hash)
        {
            user.password = hash;

            if (err)
            {
                console.log(err);
            }
            else
            {

                if (user.name != null && user.surname != null && user.email != null){
                    // Save the user
                    user.save((err, userStored) => {
                        if (err)
                        {
                            res.status(500).send({message:'Error while saving the user.'});
                        }
                        else
                        {
                            if (!userStored)
                            {
                                res.status(404).send({message: 'The user was not registered.'});
                            }
                            else
                            {
                                res.status(200).send({user:userStored});
                            }
                        }
                    });
                }
                else
                {
                    res.status(200).send({message: 'Fill out all the fields.'});
                }
            }
        });
    }
    else
    {
        res.status(500).send({message: 'Enter your password.'});
    }

  }

  update(req, res)
  {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate({userId: userId}, update, function (err, userUpdated) {
        if (err)
        {
            res.status(500).send({message: 'Error updating the user.'})
        }
        else
        {
            if (!userUpdated)
            {
                res.status(404).send({message: 'Could not update the user data.'})
            }
            else
            {
                res.status(200).send({user: userUpdated});
            }
        }
    });
  }

  uploadImage(req, res)
  {
    var userId = req.params.id;
    var file_name = 'No upload ...';

    if (req.files)
    {
        var file_path = req.files.image.path; //El fichero que vamos a subir
        var file_split = file_path.split('\/');
        var upload_name = file_split[2];

        console.log(file_split);

        var ext_split = upload_name.split('\.');
        var file_name = ext_split[0];
        var file_ext = ext_split[1];
        var imageDbName = file_name + '.' + file_ext;
        console.log(file_name);
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg')
        {
            User.findByIdAndUpdate({userId: userId}, {image: imageDbName}, function (err, userUpdated) {
                if (!userUpdated)
                {
                    res.status(404).send({message: 'Could not update the user data.'});
                }
                else
                {
                    res.status(200).send({image:imageDbName, userUpdated});
                }
            });
        }
        else
        {
            res.status(200).send({message: 'Extension of the file is not valid.'});
        }
    }
    else
    {
        res.status(200).send({message:'No files to upload.'});
    }
  }

  getImageFile(req, res)
  {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, function (exists)
    {
        if(exists)
        {
            res.sendFile(path.resolve(path_file));
        }
        else
        {
            res.status(200).send({image:imageFile, message:'The image does not exist.'});
        }
    });
  }

  /*login(req, res)
  {
    var params   = req.body;
    var password = params.password;
    var email    = params.email;

    User.findOne({email: email.toLowerCase()}, function (err, user) {
        if (err)
        {
                res.status(500).send({message:'Error entering data.'});
        }
        else
        {
            if (!user)
            {
                res.status(404).send({message: 'The user does not exist.'});
            }
            else
            {
                //Comprobar contraseña
                bcrypt.compare(password, user.password, function (err, check)
                {
                    if (check)
                    {
                        //Devolver los datos del usuario logeado
                        if (params.gethash)
                        {
                            //Devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }
                        else
                        {
                            res.status(200).send({user});
                        }
                    }
                    else
                    {
                        res.status(404).send({message: 'The user cannot login at this time.'});
                    }
                });
            }
        }
    });
  }*/
  findById(req, res)
  {
    var userId = req.params.id;
    User.findOne({userId: userId}, function (err, user) {
      if (err)
      {
         res.status(500).send({message:'Error entering data.'});
      }
      else
      {
          if (!user)
          {
              res.status(404).send({message: 'The user does not exist.'});
          }
          else
          {
            res.status(200).send({user});
          }
      }
    });
  }
  findAll(req, res)
  {
    User.find({}, function (err, users) {
      if (err)
      {
         res.status(500).send({message:'Error finding data.'});
      }
      else
      {
          if (!users)
          {
              res.status(404).send({message: 'No users exists.'});
          }
          else
          {
            res.status(200).send({users});
          }
      }
    });
  }
}
export default new Controller();
