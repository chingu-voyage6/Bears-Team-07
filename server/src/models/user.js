const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: false
  },
  role: String,
  image: String,
});

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userId',
});

module.exports = mongoose.model('User', UserSchema);
