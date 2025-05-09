const authService = require('../services/auth');

exports.googleLogin = async (req, res) => {
  try {
    const googleToken = req.body.token;

    if (!googleToken) {
      return res.status(400).json({ message: 'Missing Google token' });
    }

    const { user, token } = await authService.loginWithGoogle(googleToken);
    res.status(200).json({ 
      user, 
      token, 
      message: 'Autenticación exitosa'
     });

  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(401).json({ message: 'Authentication failed' });
  }
};
