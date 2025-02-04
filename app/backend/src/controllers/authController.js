import passport from 'passport';
export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ error: 'Erro interno do servidor' });
        if (!user) return res.status(401).json({ error: info.message });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao fazer login' });

            req.session.save((err) => {
                if (err) return res.status(500).json({ error: 'Erro ao salvar sessão' });

                return res.json({
                    success: true,
                    user: {
                        email: user.email,
                        nome: user.nome
                    }
                });
            });
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