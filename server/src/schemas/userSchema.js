const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.authenticateUserSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),

  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
);

exports.payloadSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email()
});

exports.paramsSchema = Joi.object({
  userId: Joi.objectId().required()
});
