import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.get('/me', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.description = 'Obtiene el perfil del usuario autenticado'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
        description: 'Perfil del usuario',
        schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[404] = {
        description: 'Usuario no encontrado'
     }
  */
  return userController.getProfile(req, res);
});

export default router;
