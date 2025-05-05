// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  googleId: String,
  avatar: String,
  phone: String,
  locale: { type: String, default: 'en' },
  timezone: { type: String, default: 'UTC' },
  lastLogin: Date,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
