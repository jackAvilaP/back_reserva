const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide a valid user name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  /*
  location: {
    lat: {
      type: Number,
      required: [true, 'Please enter a valid latitude'],
    },
    long: {
      type: Number,
      required: [true, 'Please enter a valid longitude'],
    },
  },*/
  role:{
    type:String,
    default: 'client',
  },
  status: {
    type: String,
    default: 'active',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
