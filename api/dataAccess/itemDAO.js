import Item from '../models/item.js';

async function findByGroupId(groupId) {
  return await Item.find({ groupId });
}

async function create(data) {
  return await new Item(data).save();
}

async function update(itemId, updates) {
  return await Item.findByIdAndUpdate(itemId, updates, { new: true });
}

async function remove(itemId) {
  return await Item.findByIdAndDelete(itemId);
}

async function findById(itemId) {
  return await Item.findById(itemId);
}

async function markAsPurchased(itemId, userId) {
  return await Item.findByIdAndUpdate(
    itemId,
    { isPurchased: true, purchasedBy: userId, purchasedAt: new Date() },
    { new: true }
  );
}

export default {
  findByGroupId,
  create,
  update,
  remove,
  findById,
  markAsPurchased
};