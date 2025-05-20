import groupDAO from '../dataAccess/group.js';

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

export default {
  createGroup,
  getGroupsByUser,
  updateGroup,
  deleteGroup
};