const groupService = require('../services/group');

exports.createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroup(req.body.name, req.user.id);
    res.status(201).json(group);
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getGroupsByUser = async (req, res) => {
  try {
    const groups = await groupService.getGroupsByUser(req.user.id);
    res.status(200).json(groups);
  } catch (err) {
    console.error('Error fetching groups:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateGroup = async (req, res) => {
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
};

exports.deleteGroup = async (req, res) => {
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
};

