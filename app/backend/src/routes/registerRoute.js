import express from 'express';
import { createUser } from '../controllers/userController.js';
import { checkNotAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', checkNotAuth, createUser);

export default router;