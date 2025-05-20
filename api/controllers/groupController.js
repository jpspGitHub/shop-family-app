import e from 'express';
import groupService from '../services/groupService.js';
import userService from '../services/userService.js';

async function createGroup(req, res) {
  try {
    const { name } = req.body;

    // 🔍 Validación
    if (!name) {
      return res.status(400).json({ message: 'El nombre del grupo es requerido.' });
    }
    
    const user = await userService.getUserById(req.user.id);

    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const group = await groupService.createGroup(req.body.name, req.user.id);
    res.status(201).json(group);
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getGroupsByUser(req, res) {
  try {
    const groups = await groupService.getGroupsByUser(req.user.id);
    res.status(200).json(groups);
  } catch (err) {
    console.error('Error fetching groups:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateGroup(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const group = await groupService.updateGroup(id, name);

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error('Error al actualizar grupo:', error.message);
    res.status(500).json({ message: 'Error al actualizar el grupo.' });
  }
}

async function deleteGroup(req, res) {
  try {
    const { id } = req.params;

    const group = await groupService.deleteGroup(id);

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    res.status(200).json({ message: 'Grupo eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar grupo:', error.message);
    res.status(500).json({ message: 'Error al eliminar el grupo.' });
  }
}

export default {
  createGroup,
  getGroupsByUser,
  updateGroup,
  deleteGroup
}; 
