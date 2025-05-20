import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String,  },
  avatar: { type: String,  },
  phone: { type: String,  },
  locale: { type: String, default: 'en' },
  timezone: { type: String, default: 'UTC' },
  lastLogin: { type: Date,  },
  lastLogout: { type: Date,  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);