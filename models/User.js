const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  firstName: {
    type: String
  },
  secondName: {
    type: String
  },
  surname: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  studies: {
    type: []
  },
  description: {
    type: String
  },
  skills: {
    type: []
  },
  whereTrain: {
    type: []
  },
  userType: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// username - String // required & unique
//   email - String // required & unique
//   firstName - String // required
//   secondName - String //
//   surname - String //
//   password - String // required
//   country - String // required
//   city - String // required
//   studies - [] // required
//   description - String // required
//   skills - [] // required
//   whereTrain - [] // required
//   userType - String
//   dateCreate - String
//   dateUpdate - String
