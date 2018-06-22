'use strict'

import mongoose from 'mongoose'
import autoIncrement from 'mongoose-plugin-autoinc'

const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String,
  image: String,
});

UserSchema.plugin(autoIncrement, {
  model: 'User',
  field: 'userId'
});

module.exports = mongoose.model('User', UserSchema);