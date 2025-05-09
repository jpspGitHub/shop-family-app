const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  token: { type: String,  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);