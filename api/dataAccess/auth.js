const User = require('../models/user');
const TokenBlacklist = require('../models/tokenBlacklist');
const mongoose = require('mongoose');

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

module.exports = {
    login,
    logoutUser,
    addBlacklistToken,
    isTokenBlacklisted
};