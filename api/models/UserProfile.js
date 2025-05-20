import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  token: { type: String,  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('UserProfile', UserProfileSchema);