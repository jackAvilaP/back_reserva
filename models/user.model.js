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
  role:{
    type:String,
    default: 'client',
  },
  profileImgUrl:{
    type:String,
  },
  status: {
    type: String,
    default: 'active',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
