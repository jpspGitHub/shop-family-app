import itemDAO from '../dataAccess/itemDAO.js';
import groupDAO from '../dataAccess/groupDAO.js';

const getItemsByGroup = async (groupId) => {
  return await itemDAO.findByGroupId(groupId);
};

const addItem = async ({ name, quantity, groupId, userId }) => {
  // 1. Validar existencia del grupo
  const group = await groupDAO.findById(groupId);
  if (!group) {
    const error = new Error('Grupo no encontrado');
    error.code = 'NOT_FOUND';
    throw error;
  }

  // 2. Validar membresía del usuario
  const isMember = group.members.some(m => m.user.toString() === userId.toString());
  if (!isMember) {
    const error = new Error('El usuario no pertenece a este grupo');
    error.code = 'FORBIDDEN';
    throw error;
  }

  return await itemDAO.create({ name, quantity, groupId, userId });
}

const updateItem = async (itemId, updates) => {
  return await itemDAO.update(itemId, updates);
};

const deleteItem = async (itemId) => {
  return await itemDAO.remove(itemId);
};

const markItemAsPurchased = async (itemId, groupId, userId) => {
  const item = await itemDAO.findById(itemId);
  if (!item) {
    throw Object.assign(new Error('Ítem no encontrado'), { code: 'NOT_FOUND' });
  }

  const group = await groupDAO.findById(groupId);
  if (!group) {
    throw Object.assign(new Error('Grupo no encontrado'), { code: 'NOT_FOUND' });
  }

  if (item.groupId.toString() !== groupId.toString()) {
    throw Object.assign(new Error('El ítem no pertenece al grupo'), { code: 'BAD_REQUEST' });
  }

  const isMember = group.members.some(m => m.user.toString() === userId.toString());
  if (!isMember) {
    throw Object.assign(new Error('Usuario no pertenece al grupo'), { code: 'FORBIDDEN' });
  }

  return await itemDAO.markAsPurchased(itemId, userId);
};

export default {
  // item
  getItemsByGroup,
  addItem,
  updateItem,
  deleteItem,
  markItemAsPurchased,
};