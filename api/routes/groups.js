import express from 'express';
const router = express.Router();

import groupController from '../controllers/groupController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Crea un nuevo grupo para el usuario autenticado'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Grupo Familiar" }
              },
              required: ["name"]
            }
          }
        }
      }
     #swagger.responses[201] = {
        description: 'Grupo creado correctamente',
        schema: { $ref: '#/definitions/Group' }
     }
  */
  return groupController.createGroup(req, res);
});

router.post('/:groupId/add-member', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Agrega un usuario a un grupo existente. Solo los administradores pueden realizar esta acción.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['groupId'] = {
        in: 'path',
        description: 'ID del grupo',
        required: true,
        type: 'string'
     }
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string", example: "664001122abcde0011223344" },
                role: { type: "string", enum: ["admin", "member"], default: "member" }
              },
              required: ["userId"]
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: 'Usuario agregado exitosamente al grupo',
        schema: {
          message: { type: "string", example: "Miembro agregado exitosamente" },
          group: { $ref: "#/definitions/Group" }
        }
     }
     #swagger.responses[403] = {
        description: 'No autorizado: solo administradores pueden agregar miembros'
     }
     #swagger.responses[404] = {
        description: 'Grupo o usuario no encontrado'
     }
     #swagger.responses[409] = {
        description: 'El usuario ya es miembro del grupo'
     }
  */
  return groupController.addMember(req, res);
});


router.get('/', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Obtiene todos los grupos del usuario autenticado'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
        description: 'Lista de grupos',
        schema: {
          type: 'array',
          items: { $ref: '#/definitions/Group' }
        }
     }
  */
  return groupController.getGroupsByUser(req, res);
});

router.put('/:id', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Actualiza el grupo indicado por ID'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del grupo a actualizar',
        required: true,
        type: 'string'
     }
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Nuevo nombre del grupo" }
              }
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: 'Grupo actualizado correctamente'
     }
  */
  return groupController.updateGroup(req, res);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Elimina el grupo indicado por ID'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del grupo a eliminar',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
        description: 'Grupo eliminado correctamente'
     }
  */
  return groupController.deleteGroup(req, res);
});

export default router;
