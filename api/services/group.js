const groupDAO = require('../dataAccess/group');

const createGroup = async (name, userId) => {
  return await groupDAO.create(name, userId);
};

const getGroupsByUser = async (userId) => {
  return await groupDAO.findByUserId(userId);
};

const updateGroup = async (id, name) => {
  return await groupDAO.updateGroup(id, name);

}

const deleteGroup = async (id) => {
  const group = await groupDAO.deleteGroup(id);
  return group;
}

module.exports = {
  createGroup,
  getGroupsByUser,
  updateGroup,
  deleteGroup
};