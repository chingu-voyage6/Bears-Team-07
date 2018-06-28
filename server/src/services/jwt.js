const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function (user) {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }

  const payload = {
    sub: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment()
      .unix(),
    exp: moment()
      .add(30, 'days')
      .unix(),
    scope: scopes
  };
  return jwt.encode(payload, process.env.SESSION_SECRET);
};
