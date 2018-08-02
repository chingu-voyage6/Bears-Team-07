const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.createUserSchema = (req, res, next) => {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().alphanum().min(2).max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(
      new RegExp('^[a-zA-Z0-9]{8,32}$'),
    ),
    admin: Joi.boolean(),
    role: Joi.string(),
    image: Joi.any(),
    active: Joi.boolean(),
  };
  const {
    error,
  } = Joi.validate(req.body, schema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'firstname':
        res.status(400).send({
          error: 'Please provide a First Name.',
        });
        break;
      case 'lastname':
        res.status(400).send({
          error: 'Please provide a Last Name.',
        });
        break;
      case 'username':
        res.status(400).send({
          error: 'Username must have a minimum of 2 and a maximum of 30 characters consisting of alphabets and numerics',
        });
        break;
      case 'email':
        res.status(400).send({
          error: 'Please provide a valid email address',
        });
        break;
      case 'password':
        res.status(400).send({
          error: 'Password must contain only lower case, upper case and numerics with a minimum of 8 and a maximum of 32 characters in length.',
        });
        break;
      default:
        res.status(400).send({
          error: error.details,
        });
    }
  } else {
    next();
  }
};

exports.validatePuffSchema = (req, res, next) => {
  const schema = {
    title: Joi.string().required(),
    content: Joi.string().required(),
    username: Joi.string(),
    tags: Joi.any(),
    comments: Joi.any(),
    hidden: Joi.boolean(),
    favs: Joi.any(),
    image: Joi.any(),
  };
  const {
    error,
  } = Joi.validate(req.body, schema);
  if (error) {
    switch (error.details[0].context.key) {
      case 'title':
        res.status(400).send({
          error: 'Please provide a puff title.',
        });
        break;
      case 'content':
        res.status(400).send({
          error: 'Please provide a puff content.',
        });
        break;
      default:
        res.status(400).send({
          error: error.details,
        });
    }
  } else {
    next();
  }
};

exports.authenticateUserSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required(),
  }),

  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
);

exports.payloadSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
});

exports.paramsSchema = Joi.object({
  userId: Joi.objectId().required(),
});