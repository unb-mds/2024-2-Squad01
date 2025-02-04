export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code && err.code.startsWith('P')) {
        switch (err.code) {
            case 'P2002':
                return res.status(400).json({ error: 'Dado único já existe' });
            case 'P2025':
                return res.status(404).json({ error: 'Registro não encontrado' });
            default:
                return res.status(400).json({ error: 'Erro de banco de dados' });
        }
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Não autorizado' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};