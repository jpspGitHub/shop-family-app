const authAgent = require('../serviceAgents/authAgent');
const userDAO = require('../dataAccess/user');
const jwt = require('jsonwebtoken');

const loginWithGoogle = async (googleToken) => {

    const googleUser = await authAgent.verifyGoogleToken(googleToken);
    let user = await userDAO.findByEmail(googleUser.email);

    if (!user) {
        user = await userDAO.createFromGoogle(googleUser);
    }else {
        // Opcional: actualizar lastLogin
        await userDAO.updateById(user._id, { lastLogin: new Date() });
        user = await userDAO.findById(user._id); // refrescar datos actualizados
    }

    const token = generateToken(user);
    return { user, token };
};

const generateToken = (user) => {
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  };
  
module.exports = {
    loginWithGoogle
};
