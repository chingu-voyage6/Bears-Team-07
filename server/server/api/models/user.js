'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String,
});

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });

module.exports = mongoose.model('User', UserSchema);
