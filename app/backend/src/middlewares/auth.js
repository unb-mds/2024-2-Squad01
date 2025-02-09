export const debugSession = (req, res, next) => {
    console.log('Debug Session Completo:', {
        sessionID: req.sessionID,
        session: req.session,
        passport: req.session.passport,
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        cookies: req.headers.cookie
    });
    next()
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