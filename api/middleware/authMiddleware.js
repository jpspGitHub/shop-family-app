import jwt from 'jsonwebtoken';
import authService from '../services/authService.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (process.env.NODE_ENV !== 'production' && req.headers?.authorization === 'SwaggerTest') {
    const fakeUser = await User.findById(process.env.FAKE_USER_ID);
    if (!fakeUser) return res.status(401).json({ message: 'Usuario fake no encontrado' });
    req.user = fakeUser;
    return next();
  }

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
    res.status(401).json({ message: 'Acceso no autorizado.' });
  }
};

export default authMiddleware;
