const  mongoose = require('mongoose'),
       autoIncrement = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
  image: String,
});

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userId',
});

module.exports = mongoose.model('User', UserSchema);
