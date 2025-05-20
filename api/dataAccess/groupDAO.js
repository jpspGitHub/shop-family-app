import Group from '../models/group.js';

const create = async (name, userId) => {
  const group = new Group({
    name,
    members: [{ user: userId, role: 'admin' }]
  });

  return await group.save();
};

const addMemberToGroup = async(groupId, userId, role) => {
  const group = await Group.findById(groupId);
  if (!group) return null;

  group.members.push({ user: userId, role });
  return await group.save();
}

const findByUserId = async (userId) => {
  return await Group.find({ 'members.user': userId });
};

const updateGroup = async (id, name) => {
  const group = await Group.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );

  return group;
}

const findById = async (id) => {
  return await Group.findById(id);
};



const deleteGroup = async (id) => {
  const group = await Group.findByIdAndDelete(id);
  return group;
}

export default {
  create,
  addMemberToGroup,
  findByUserId,
  updateGroup,
  deleteGroup,
  findById
};
