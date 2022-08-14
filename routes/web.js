import express from  'express';
const router=express.Router();
import userController from '../controllers/userController.js';


router.get('/', userController.home);
router.get('/registration', userController.registration);
router.post('/registration', userController.createUserDoc);
router.get('/login', userController.login);
router.post('/login', userController.verifyLogin);



export default router;