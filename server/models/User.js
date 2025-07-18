const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  dob: Date,
  gender: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
