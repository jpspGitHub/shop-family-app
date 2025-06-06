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
        schema: { $ref: '#/components/schemas/Group' }
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
          group: { $ref: "#/components/schemas/Group" }
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
          items: { $ref: '#/components/schemas/Group' }
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
        description: 'Grupo actualizado correctamente',
        schema: { $ref: '#/components/schemas/Group' }
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
        description: 'Grupo eliminado correctamente',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Grupo eliminado correctamente.' }
          }
        }
     }
  */
  return groupController.deleteGroup(req, res);
});

router.patch('/:groupId/members/:userId', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Groups']
     #swagger.description = 'Modifica el rol de un miembro existente dentro del grupo. Solo los administradores pueden realizar esta acción.'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['groupId'] = {
        in: 'path',
        description: 'ID del grupo',
        required: true,
        type: 'string'
     }
     #swagger.parameters['userId'] = {
        in: 'path',
        description: 'ID del usuario cuyo rol se desea modificar',
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
                role: { type: "string", enum: ["admin", "member"], example: "admin" }
              },
              required: ["role"]
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: 'Rol actualizado correctamente',
        schema: {
          message: { type: "string", example: "Rol actualizado correctamente" },
          group: { $ref: "#/components/schemas/Group" }
        }
     }
     #swagger.responses[400] = { description: 'Rol inválido' }
     #swagger.responses[403] = { description: 'No autorizado para modificar el rol' }
     #swagger.responses[404] = { description: 'Grupo o usuario no encontrado' }
     #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  return groupController.updateMemberRole(req, res);
});

export default router;
