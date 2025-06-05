import Item from '../models/item.js';
import mongoose from 'mongoose';

async function findByGroupId(groupId) {
  return await Item.find({ groupId });
}

async function create({ name, quantity, groupId, userId }) {
  const item = new Item({
    name,
    quantity,
    groupId: new mongoose.Types.ObjectId(groupId),
    addedBy: new mongoose.Types.ObjectId(userId),
    isPurchased: false
  });

  return await item.save();
}

async function update(itemId, updates) {
  return await Item.findByIdAndUpdate(itemId, updates, { new: true });
}

async function remove(itemId) {
  return await Item.findByIdAndDelete(itemId);
}

export default {
  findByGroupId,
  create,
  update,
  remove
};