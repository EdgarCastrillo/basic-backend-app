const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  imageUrl: [{
    type: String
  }],
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  academic: {
    type: String
  },
  description: {
    type: String
  },
  skills: {
    type: []
  },
  train: {
    type: String
  },
  trainer: {
    type: Boolean
  },
  userType: {
    type: String
  },
  myBookmarks: [{
    type: String
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
