const express = require('express');
const router = express.Router();
const { authLogin, authRegister, verifyEmail } = require('../controllers/authController');
const { createBoradCont,inviteMemberController,acceptInvitationController} = require('../controllers/boardControlller');
const {checkAdmin} = require('../middlewares/boardmemberPermission');

router.post('/register', authRegister);  
router.post('/login', authLogin);       
router.get('/user/verify/:token', verifyEmail);  

router.post('/createboard', createBoradCont);
router.post('/inviteMember', checkAdmin, inviteMemberController);
router.get('/accept-invitation/:token',acceptInvitationController)

module.exports = router;
