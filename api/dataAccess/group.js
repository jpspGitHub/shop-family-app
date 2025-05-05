const Group = require('../models/group');

const create = async (name, userId) => {
  const group = new Group({ name, members: [userId] });
  return await group.save();
};

const findByUserId = async (userId) => {
  return await Group.find({ members: userId });
};

module.exports = {
  create,
  findByUserId
};
