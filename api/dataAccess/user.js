const User = require('../models/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createFromGoogle = async ({ email, name, picture, sub, locale }) => {
  const user = new User({
    email,
    name,
    avatar: picture,
    googleId: sub,
    locale: locale || 'en',
    timezone: 'UTC',       // podrías cambiar esto con la hora del cliente si se conoce
    lastLogin: new Date(),
    active: true
  });

  return await user.save();
};

const findById = async (id) => {
  var user = await User.findById(id);
  return user.select('-__v');
};

const updateById = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, { new: true, select: '-__v' });
};

const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  findById,
  updateById,
  deleteById,
  findByEmail,
  createFromGoogle
};
