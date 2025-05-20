import Group from '../models/group';

const create = async (name, userId) => {
    const group = new Group({
      name,
      members: [{ user: userId, role: 'admin' }]
    });

    await group.save();
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

export default {
  create,
  findByUserId,
  updateGroup,
  deleteGroup
};
