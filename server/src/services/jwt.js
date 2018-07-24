const jwt = require('jwt-simple');
const moment = require('moment');

exports.validateToken = (req, res, next) => {
  let token = '';
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers['x-jc-token']) {
    token = req.headers['x-jc-token'];
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    token = req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    token = req.cookies.token;
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  if (!token) {
    req.log.debug('Unauthorized: Token not found');
    res.status(401)
      .send({
        message: 'Unauthorized: Token not found',
      });
  } else {
    try {
      jwt.decode(token, process.env.SESSION_SECRET);
    } catch (e) {
      req.log.debug(`Unauthorized: ${e}`);
      res.status(401)
        .send({
          message: `Unauthorized: ${e}`,
        });
      return;
    }
    next();
  }
};

exports.createToken = user => {
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
    active: user.acive,
    iat: moment()
      .unix(),
    exp: moment()
      .add(30, 'seconds')
      .unix(),
    scope: scopes,
  };
  return jwt.encode(payload, process.env.SESSION_SECRET);
};