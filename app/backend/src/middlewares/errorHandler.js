export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

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