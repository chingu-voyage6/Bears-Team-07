const mongoose = require('mongoose');

const PuffSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    body: String,
    date: Date,
  }],
  hidden: {
    type: Boolean,
    default: false,
  },
  favs: {
    type: Number,
  },
  image: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  minimize: false,
  toObject: {
    retainKeyOrder: true,
  },
});

module.exports = mongoose.model('Puff', PuffSchema);
