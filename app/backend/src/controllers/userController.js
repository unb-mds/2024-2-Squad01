import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const hashedSenha = await bcrypt.hash(req.body.senha, 10);
        await prisma.user.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                senha: hashedSenha
            }
        });
        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(400).json({ error: 'Erro ao criar usuário' });
    }
};