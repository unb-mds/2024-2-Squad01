import express from 'express';
import multer from 'multer';
import { createUser, updateUser, getProfile, getPublishedBooks } from '../controllers/userController.js';
import { checkNotAuth, checkAuth } from '../middlewares/auth.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile-photos/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/register', checkNotAuth, createUser);
router.put('/updateProfile', checkAuth, upload.single('foto'), updateUser);
router.get('/getProfile', checkAuth, getProfile);
router.get('/getPublishedBooks', checkAuth, getPublishedBooks);


export default router;