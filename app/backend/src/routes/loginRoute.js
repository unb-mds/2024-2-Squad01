import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { checkNotAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', checkNotAuth, login);
router.delete('/logout', logout);

export default router;