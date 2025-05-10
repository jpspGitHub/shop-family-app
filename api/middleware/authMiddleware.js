const jwt = require('jsonwebtoken');
const authService = require('../services/auth');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó un token.' });
  }

  try {
    const isBlacklisted = await authService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!req.user.id) {
      return res.status(401).json({ message: 'Token inválido: no se encontró un ID de usuario.' });
    }

    next();
  } catch (error) {
    console.error('❌ Error al verificar el token:', error.message);
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
