import passport from 'passport';

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        if (!user) {
            return res.status(401).json({ error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao fazer login' });
            }
            return res.status(200).json({ message: 'Login realizado com sucesso' });
        });
    })(req, res, next);
};

export const logout = (req, res) => {
    req.logOut((error) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao fazer logout' });
        }
        res.json({ message: 'Logout realizado com sucesso' });
    });
};