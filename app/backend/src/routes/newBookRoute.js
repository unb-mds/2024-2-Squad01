import express from 'express';
import { checkAuth } from '../middlewares/auth.js'
import { createBook } from '../controllers/bookController.js'

const router = express.Router();

router.post('/createBook', checkAuth, createBook)

export default router