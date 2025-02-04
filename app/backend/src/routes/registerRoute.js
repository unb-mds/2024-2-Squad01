import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';
import { checkNotAuth, checkAuth } from '../middlewares/auth.js';
//import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/register', checkNotAuth, createUser);
router.put('/update/:id', checkAuth, updateUser);

export default router;