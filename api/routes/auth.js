// routes/auth.js

import express from 'express';

const router = express.Router();
import authController from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logoutUser);


export default router;
