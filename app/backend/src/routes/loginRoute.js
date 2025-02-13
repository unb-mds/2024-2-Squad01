import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { checkAuth, checkNotAuth } from '../middlewares/auth.js';
import { debugSession } from '../middlewares/auth.js';
const router = express.Router();

router.get("/status", debugSession, (req, res) => {
    res.json({
        sessionID: req.sessionID,
        session: req.session,
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});
router.post('/login', checkNotAuth, login);
router.delete('/logout', checkAuth, logout);

export default router;