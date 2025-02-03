import express from 'express';
import { checkAuth } from '../middlewares/auth.js'
import { createBook } from '../controllers/bookController.js'
import { debugSession } from '../middlewares/auth.js';

const router = express.Router();

router.use(debugSession);
router.post('/createBook', checkAuth, createBook)

export default router