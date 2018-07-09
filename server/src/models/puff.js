const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-plugin-autoinc');

const PuffSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    body: String,
    date: Date
  }],
  hidden: {
    type: Boolean,
    default: false
  },
  meta: {
    votes: Number,
    favs: Number
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  minimize: false,
  toObject: {
    retainKeyOrder: true
  }
});

PuffSchema.plugin(autoIncrement.plugin, {
  model: 'Puff',
  field: 'puffId',
});

/*
When a puff is removed, you want to remove the
puffs array element references to that puff's _id
from all users docs.
*/
PuffSchema.pre('remove', function(next) {
  var puff = this;
  puff.model('User').update(
    {
      puffs: puff._id
    },
    {
      $pull: {
        puffs: puff._id
      }
    },
    {
      multi: true
    },
    next);
});

module.exports = mongoose.model('Puff', PuffSchema);
