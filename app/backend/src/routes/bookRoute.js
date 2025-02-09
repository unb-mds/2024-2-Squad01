import express from 'express';
import { checkAuth } from '../middlewares/auth.js';
import multer from 'multer';
import { createBook, getBooks } from '../controllers/bookController.js';
import { debugSession } from '../middlewares/auth.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.use(debugSession);
router.post('/createBook', checkAuth, upload.single('foto'), createBook);
router.get('/', getBooks)

export default router