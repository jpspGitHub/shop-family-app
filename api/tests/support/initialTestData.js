import mongoose from 'mongoose';
import User from '../../models/user';

const contants = {
  userId: '64b29cfa9d2e4b8d5c1b1e91',
}

async function loadInitialTestData() {
  const user = new User({
    _id: new mongoose.Types.ObjectId('64b29cfa9d2e4b8d5c1b1e91'),
    name: 'Pablo Silva',
    email: 'pablo@example.com',
    googleId: '12345',
    avatar: 'https://example.com/avatar.png',
  });

  await user.save();
  return { user };
}

export default { contants, loadInitialTestData };
