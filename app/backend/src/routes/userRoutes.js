import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;