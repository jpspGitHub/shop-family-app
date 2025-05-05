const groupDAO = require('../dataAccess/group');

const createGroup = async (name, userId) => {
  return await groupDAO.create(name, userId);
};

const getGroupsByUser = async (userId) => {
  return await groupDAO.findByUserId(userId);
};

module.exports = {
  createGroup,
  getGroupsByUser,
};