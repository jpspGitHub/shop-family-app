import groupDAO from '../dataAccess/groupDAO.js';
import userDAO from '../dataAccess/userDAO.js';

const createGroup = async (name, userId) => {
  return await groupDAO.create(name, userId);
};

const addMember = async ({ groupId, requesterId, userId, role = 'member' }) =>{
  if (!['admin', 'member'].includes(role)) {
    const err = new Error('Rol inválido');
    err.code = 'BAD_REQUEST';
    throw err;
  }

  const group = await groupDAO.findById(groupId);
  if (!group) throw Object.assign(new Error('Grupo no encontrado'), { code: 'NOT_FOUND' });

  const requester = group.members.find(m => m.user.toString() === requesterId.toString());
  if (!requester || requester.role !== 'admin') {
    throw Object.assign(new Error('No autorizado'), { code: 'FORBIDDEN' });
  }

  if (group.members.some(m => m.user.toString() === userId)) {
    throw Object.assign(new Error('El usuario ya es miembro'), { code: 'CONFLICT' });
  }

  const userExists = await userDAO.findById(userId);
  if (!userExists) throw Object.assign(new Error('Usuario no encontrado'), { code: 'NOT_FOUND' });

  const result = await groupDAO.addMemberToGroup(groupId, userId, role);

  return { message: 'Miembro agregado exitosamente', group: result };
}


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
  addMember,
  getGroupsByUser,
  updateGroup,
  deleteGroup
};