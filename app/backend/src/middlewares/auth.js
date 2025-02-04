export const debugSession = (req, res) => {
    console.log('Debug Session Completo:', {
        sessionID: req.sessionID,
        session: req.session,
        passport: req.session.passport,
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        cookies: req.headers.cookie
    });

    return res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user ? {
            id: req.user.id,
            email: req.user.email,
            nome: req.user.nome
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