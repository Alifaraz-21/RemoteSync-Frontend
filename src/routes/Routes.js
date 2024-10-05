const express = require('express');
const router = express.Router();
const { authLogin, authRegister, verifyEmail } = require('../controllers/authController');

router.post('/register', authRegister);  
router.post('/login', authLogin);       
router.get('/user/verify/:token', verifyEmail);  

module.exports = router;
