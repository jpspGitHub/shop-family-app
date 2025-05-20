import authService from '../services/authService.js';

async function login(req, res) {
  try {
    const googleToken = req.body.token;

    if (!googleToken) {
      return res.status(400).json({ message: 'Missing Google token' });
    }

    const { user, token } = await authService.login(googleToken);
    res.status(200).json({ 
      user, 
      token, 
      message: 'Autenticación exitosa'
     });

  } catch (error) {
    // console.error('Login failed:', error.message);
    res.status(401).json({ message: 'Authentication failed' });
  }
}

async function logoutUser(req, res) {
  try {
    const userId = req.user.id;

    // Actualizamos el último logout
    await authService.logoutUser(userId);
    // Agregar el token a la lista negra
    const token = req.header('Authorization')?.split(' ')[1];
    await authService.addBlacklistToken(token);

    res.status(200).json({ message: 'Logout registrado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar logout.' });
  }
}

export default {
  login,
  logoutUser
};