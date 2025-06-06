import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, default: 1 },
  isPurchased: { type: Boolean, default: false },
  groupId: { type: String, ref: 'Group', required: true },
  addedBy: { type: String, ref: 'User', required: true },
  purchasedBy: { type: String, ref: 'User' },
  purchasedAt: { type: Date },
  deletedBy: { type: String, ref: 'User' },
  deletedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
