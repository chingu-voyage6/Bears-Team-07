'use strict';

require('./src/env');
const Hapi = require('hapi');
const mongoose = require('mongoose');
//const hapiAuthJWT = require('hapi-auth-jwt2');
//const jwksRsa = require('jwks-rsa');
const UserController = require('./src/controllers/user');
const url = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/deardiiary';

const server = new Hapi.Server({
  port: process.env.PORT || '3000',
  host: 'localhost'
});

/*const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  console.log("Decoded", decoded);
  if (decoded && decoded.sub) {
    return callback(null, true, {});
  }

  return callback(null, false, {});
};*/

const registerRoutes = () => {

  server.route({
    method: 'GET',
    path: '/users',
    handler: UserController.list
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.get
  });
  server.route({
    method: 'POST',
    path: '/users',
    handler: UserController.create
  });

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: UserController.update
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: UserController.remove
  });

};

const init = async () => {
  /*await server.register(hapiAuthJWT);
  // see: http://Hapi.com/api#serverauthschemename-scheme
  server.auth.strategy('jwt', 'jwt', {
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      // AUTH0-DOMAIN name e.g https://prosper.auth0.com
      jwksUri: process.env.AUTH0_DOMAIN + '/.well-known/jwks.json'
    }),
    verifyOptions: {
      audience: process.env.API_AUDIENCE_ATTRIBUTE,
      issuer: process.env.AUTH0_DOMAIN,
      algorithms: ['RS256']
    },
    validate: validate
  });

  server.auth.default('jwt');*/

  registerRoutes();

  await server.start();
  return server;

};

init().then(server => {
  // Once started, connect to Mongo through Mongoose
  mongoose.connect(url, {}).then(() => {
    console.log(`Connected to Mongo server`)
  }, err => {
    console.log(err)
  });
  console.log('Server running at:', server.info.uri);
}).catch(err => {
  console.log(err);
});
