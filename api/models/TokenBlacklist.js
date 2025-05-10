const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' }  // Token caduca automáticamente en 7 días
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
