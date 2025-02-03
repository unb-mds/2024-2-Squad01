import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { checkNotAuth } from '../middlewares/auth.js';
import { debugSession } from '../middlewares/auth.js';
const router = express.Router();

router.get("/status", debugSession);
router.post('/login', checkNotAuth, login);
router.delete('/logout', logout);

export default router;