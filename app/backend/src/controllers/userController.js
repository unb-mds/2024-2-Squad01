import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const register = async (req, res) => {
    const { nome, senha, email, foto, whatsApp, instagram } = req.body;
    console.log('Dados recebidos:', req.body); // Adicione esta linha
    if (!nome || !senha || !email) {
        return res.status(400).json({ error: 'Nome, senha e email são obrigatórios' });
    }
    try {
        const newUser = await prisma.user.create({
            data: {
                nome,
                senha,
                email,
                foto,
                whatsApp,
                instagram
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user && user.senha === senha) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Senha ou email incorreto' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default {
    register,
    login
};