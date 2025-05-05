const itemDAO = require('../dataAccess/item');

const getItemsByGroup = async (groupId) => {
  return await itemDAO.findByGroupId(groupId);
};

const addItem = async (data) => {
  return await itemDAO.create(data);
};

const updateItem = async (itemId, updates) => {
  return await itemDAO.update(itemId, updates);
};

const deleteItem = async (itemId) => {
  return await itemDAO.remove(itemId);
};

module.exports = {
  // item
  getItemsByGroup,
  addItem,
  updateItem,
  deleteItem,
};