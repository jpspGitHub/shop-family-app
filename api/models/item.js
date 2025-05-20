import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, default: 1 },
  isPurchased: { type: Boolean,  },
  groupId: { type: String, ref: 'Group', required: true },
  addedBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);