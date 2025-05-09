const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, groupController.createGroup);
router.get('/', authMiddleware, groupController.getGroupsByUser);
router.put('/:id', authMiddleware, groupController.updateGroup);
router.delete('/:id', authMiddleware, groupController.deleteGroup); 
module.exports = router;
