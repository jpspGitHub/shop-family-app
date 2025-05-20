import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' }
  }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Group', GroupSchema);