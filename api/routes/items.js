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

router.post('/', authMiddleware, async (req, res) => {
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
                 quantity: { type: "string", example: "2 unidades" },
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
      #swagger.responses[403] = {
         description: 'El usuario no pertenece al grupo',
         schema: { message: "El usuario no pertenece a este grupo" }
      }
      #swagger.responses[404] = {
         description: 'Grupo no encontrado',
         schema: { message: "Grupo no encontrado" }
      }
      #swagger.responses[500] = {
         description: 'Error interno del servidor',
         schema: { message: "Error al crear el ítem" }
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
