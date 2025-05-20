import Item from '../models/item';

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

export default {
  findByGroupId,
  create,
  update,
  remove
};