const Item = require('../models/item');

exports.findByGroupId = async (groupId) => {
  return await Item.find({ groupId });
};

exports.create = async (data) => {
  return await new Item(data).save();
};

exports.update = async (itemId, updates) => {
  return await Item.findByIdAndUpdate(itemId, updates, { new: true });
};

exports.delete = async (itemId) => {
  return await Item.findByIdAndDelete(itemId);
};
