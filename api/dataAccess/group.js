const Group = require('../models/group');

const create = async (name, userId) => {
  const group = new Group({ name, members: [userId] });
  return await group.save();
};

const findByUserId = async (userId) => {
  return await Group.find({ members: userId });
};

const updateGroup = async (id, name) => {
  const group = await Group.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );

  return group;
}

const deleteGroup = async (id) => {
  const group = await Group.findByIdAndDelete(id);
  return group;
}

module.exports = {
  create,
  findByUserId,
  updateGroup,
  deleteGroup
};
