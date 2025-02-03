import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';
import { checkNotAuth } from '../middlewares/auth.js';
import { verifyToken } from '../middleware/verifyUser.js'; 

const router = express.Router();

router.post('/register', checkNotAuth, createUser);

router.put('/update/:id', verifyToken, updateUser); 

export default router;