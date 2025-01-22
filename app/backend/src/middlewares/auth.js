export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Não autorizado' });
};

export const checkNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(400).json({ message: 'Usuário já autenticado' });
    }
    next();
};