import express from 'express';

const router = express.Router();
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/login', async (req, res) => {
  /* #swagger.tags = ['Auth']
     #swagger.description = 'Login con token de Google'
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string", example: "ya29.a0Af..." }
              },
              required: ["token"]
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: 'Usuario autenticado correctamente',
        schema: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string', example: 'jwt-token' },
            message: { type: 'string', example: 'Autenticación exitosa' }
          }
        }
     }
     #swagger.responses[401] = {
        description: 'Token inválido o expirado'
     }
  */
  return authController.login(req, res);
});

router.post('/logout', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Auth']
     #swagger.description = 'Logout del sistema'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
        description: 'Sesión cerrada correctamente',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Logout registrado correctamente.' }
          }
        }
     }
     #swagger.responses[401] = {
        description: 'Token inválido o expirado'
     }
  */
  return authController.logoutUser(req, res);
});

export default router;
