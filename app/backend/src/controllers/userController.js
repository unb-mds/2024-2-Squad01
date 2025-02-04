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

export const updateUser = async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body;
        const userId = req.user.id; 

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        let hashedSenha = user.senha;
        if (senha) {
            hashedSenha = await bcrypt.hash(senha, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                nome: nome || user.nome, 
                email: email || user.email, 
                senha: hashedSenha,
            },
        });

        res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
};