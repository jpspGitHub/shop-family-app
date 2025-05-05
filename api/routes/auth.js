// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login with Google
router.post('/google-login', authController.googleLogin);


module.exports = router;
