import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/me', authMiddleware, userController.getProfile);

export default router;