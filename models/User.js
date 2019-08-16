const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  surname: {
    type: String
  },
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
