import express from 'express';
const router = express.Router();

import itemController from '../controllers/itemController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware);

router.get('/:groupId', async (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.description = 'Obtiene todos los ítems de un grupo'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['groupId'] = {
        in: 'path',
        description: 'ID del grupo',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
        description: 'Ítems del grupo',
        schema: {
          type: 'array',
          items: { $ref: '#/definitions/Item' }
        }
     }
  */
  return itemController.getItemsByGroup(req, res);
});

router.post('/', async (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.description = 'Crea un nuevo ítem en un grupo'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Pan" },
                groupId: { type: "string", example: "665abcabcabcabcabcabcabc" }
              },
              required: ["name", "groupId"]
            }
          }
        }
      }
     #swagger.responses[201] = {
        description: 'Ítem creado',
        schema: { $ref: '#/definitions/Item' }
     }
  */
  return itemController.addItem(req, res);
});

router.put('/:itemId', async (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.description = 'Actualiza un ítem por ID'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['itemId'] = {
        in: 'path',
        description: 'ID del ítem',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
        description: 'Ítem actualizado correctamente'
     }
  */
  return itemController.updateItem(req, res);
});

router.patch('/:itemId/purchase', async (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.description = 'Marca un ítem como comprado'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['itemId'] = {
        in: 'path',
        description: 'ID del ítem',
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
                groupId: { type: "string", example: "665abcabcabcabcabcabcabc" }
              },
              required: ["groupId"]
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: 'Ítem marcado como comprado',
        schema: { $ref: '#/definitions/Item' }
     }
  */
  return itemController.markItemAsPurchased(req, res);
});

router.delete('/:itemId', async (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.description = 'Elimina un ítem por ID'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['itemId'] = {
        in: 'path',
        description: 'ID del ítem',
        required: true,
        type: 'string'
     }
     #swagger.responses[204] = {
        description: 'Ítem eliminado correctamente'
     }
  */
  return itemController.deleteItem(req, res);
});

export default router;
