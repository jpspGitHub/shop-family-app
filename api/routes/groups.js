import express from 'express';
const router = express.Router();
import groupController from '../controllers/groupController';
import authMiddleware from '../middleware/authMiddleware';


router.post('/', authMiddleware, groupController.createGroup);
router.get('/', authMiddleware, groupController.getGroupsByUser);
router.put('/:id', authMiddleware, groupController.updateGroup);
router.delete('/:id', authMiddleware, groupController.deleteGroup);
export default router;
