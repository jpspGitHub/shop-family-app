import express from 'express';
const router = express.Router();
import itemController from '../controllers/itemController';
import authMiddleware from '../middleware/authMiddleware';

router.use(authMiddleware);

/**
 * @swagger
 * /api/items/{groupId}:
 *   get:
 *     description: Get all items for a group
 */
router.get('/:groupId', itemController.getItemsByGroup);

/**
 * @swagger
 * /api/items:
 *   post:
 *     description: Create a new item
 */
router.post('/', itemController.addItem);

/**
 * @swagger
 * /api/items/{itemId}:
 *   put:
 *     description: Update an item
 */
router.put('/:itemId', itemController.updateItem);

/**
 * @swagger
 * /api/items/{itemId}:
 *   delete:
 *     description: Delete an item
 */
router.delete('/:itemId', itemController.deleteItem);

export default router;
