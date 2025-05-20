import userDAO from '../dataAccess/user';

const getUserById = async (id) => {
  return await userDAO.findById(id);
};

const updateUser = async (id, updates) => {
  return await userDAO.updateById(id, updates);
};

const deleteUser = async (id) => {
  return await userDAO.deleteById(id);
};

export default {
  getUserById,
  updateUser,
  deleteUser
};