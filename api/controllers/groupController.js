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