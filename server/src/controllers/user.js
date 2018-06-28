var User =  require('../models/user');

/**
 * List Users
 */
exports.list = (req, h) => {
  return User.find({}).exec().then((user) => {

    return { users: user };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * Get User by ID
 */
exports.get = (req, h) => {

  return User.find({userId: req.params.id}).exec().then((user) => {

    if(!user) return { message: 'User not Found' };

    return { user: user };

  }).catch((err) => {

    return { err: err };

  });
}


/**
 * POST a User
 */
exports.create = (req, h) => {

  const userData = {
    name: req.payload.name,
    surname: req.payload.surname,
    email: req.payload.email,
    password: req.payload.password
  };

  return User.create(userData).then((user) => {

     return { message: "User created successfully", user: user };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * PUT | Update User by ID
 */
exports.update = (req, h) => {

  return User.find({userId: req.params.id}).exec().then((user) => {

    if (!user) return { err: 'User not found' };

    user.name = req.payload.name;
    user.surname = req.payload.surname;
    user.email = req.payload.email;
    user.password = req.payload.password;

    user.save(userData);

  }).then((data) => {

      return { message: "User data updated successfully" };

  }).catch((err) => {

      return { err: err };

  });
}

/**
 * Delete User by ID
 */
exports.remove = (req, h) => {

  return User.find({userId: req.params.id}).exec(function (err, user) {

    if (err) return { dberror: err };
    if (!user) return { message: 'User not found' };

    user.remove(function (err) {
      if (err) return { dberror: err };

      return { success: true };
    });
  });
}
