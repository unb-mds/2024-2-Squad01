import passport from 'passport';

export const debugSession = (req, res) => {
    console.log('Debug session details:', {
        sessionID: req.sessionID,
        session: req.session,
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        passport: req.session.passport,
        cookies: req.headers.cookie
    });

    return res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user ? {
            email: req.user.email
        } : null
    });
};

export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Não autorizado' });
};

export const checkNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(403).json({
            error: 'Usuário já está autenticado. Faça logout primeiro.'
        });
    }
    next();
};