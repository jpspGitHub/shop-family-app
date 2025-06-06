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

async function addMember (req, res) {
  const { groupId } = req.params;
  const { userId, role } = req.body;
  const requesterId = req.user._id;

  try {
    const result = await groupService.addMember({ groupId, requesterId, userId, role });
    return res.status(200).json(result);
  } catch (err) {
    if (err.code === 'FORBIDDEN') return res.status(403).json({ message: err.message });
    if (err.code === 'NOT_FOUND') return res.status(404).json({ message: err.message });
    if (err.code === 'CONFLICT') return res.status(409).json({ message: err.message });
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

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

async function updateMemberRole(req, res) {
  const { groupId, userId } = req.params;
  const { role } = req.body;
  const requesterId = req.user._id;

  try {
    const result = await groupService.updateMemberRole({
      groupId,
      requesterId,
      userId,
      role,
    });

    return res.status(200).json(result);

  } catch (err) {
    switch (err.code) {
      case 'BAD_REQUEST':
        return res.status(400).json({ message: err.message });
      case 'FORBIDDEN':
        return res.status(403).json({ message: err.message });
      case 'NOT_FOUND':
        return res.status(404).json({ message: err.message });
      case 'INTERNAL_ERROR':
        return res.status(500).json({ message: err.message });
      default:
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};
export default {
  createGroup,
  addMember,
  getGroupsByUser,
  updateGroup,
  deleteGroup,
  updateMemberRole
}; 
