import User from '../models/User.js';
import TokenBlacklist from '../models/tokenBlacklist.js';

const login = async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
    return user;
};

const logoutUser = async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { lastLogout: new Date() });
    return user;
}

const addBlacklistToken = async (token) => {
    const tokenBlacklist = await TokenBlacklist.create({ token });
    return tokenBlacklist;
}

const isTokenBlacklisted = async (token) => {
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    return !!blacklistedToken;
}

export default {
    login,
    logoutUser,
    addBlacklistToken,
    isTokenBlacklisted
};