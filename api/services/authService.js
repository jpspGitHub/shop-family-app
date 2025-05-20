import authAgent from '../serviceAgents/authAgent.js';
import userDAO from '../dataAccess/userDAO.js';
import authDAO from '../dataAccess/authDAO.js';
import jwt from 'jsonwebtoken';

const login = async (googleToken) => {

    const googleUser = await authAgent.verifyGoogleToken(googleToken);
    let user = await userDAO.findByEmail(googleUser.email);

    if (!user) {
        user = await userDAO.createFromGoogle(googleUser);
    }else {
        await authDAO.login(user._id);
        user = await userDAO.findById(user._id); 
    }

    const token = generateToken(user);
    return { user, token };
};

const logoutUser = async (userId) => {
  let user = await authDAO.logoutUser(userId);
  return user;
}

const generateToken = (user) => {
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
}

const addBlacklistToken = async (token) => {
  const tokenBlacklist = await authDAO.addBlacklistToken(token);
  return tokenBlacklist;
}

const isTokenBlacklisted = async (token) => {
  const blacklistedToken = await authDAO.isTokenBlacklisted(token);
  return !!blacklistedToken;
}

export default {
  login,
  logoutUser,
  addBlacklistToken,
  isTokenBlacklisted
};
