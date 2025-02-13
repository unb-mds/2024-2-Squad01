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
export const getProfile = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(400).json({ error: 'Erro ao buscar usuário' });
    }
};
export const getPublishedBooks = async (req, res) => {
    try {
        const publishedBooks = await prisma.book.findMany({
            where: { email_publicador: req.user ? req.user.email : undefined },
            include: {
                publicador: {
                    select: { foto: true, nome: true }
                }
            }
        });

        const formattedBooks = publishedBooks.map((book) => ({
            ...book,
            userPhoto: book.publicador?.foto || '',
            username: book.publicador?.nome || 'Usuário Desconhecido'
        }));

        res.status(200).json(formattedBooks);
    } catch (error) {
        console.error('Erro ao buscar livros publicados:', error);
        res.status(500).json({ error: 'Erro ao buscar livros publicados.' });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { nome, senha, descricao, whatsApp, instagram } = req.body;
        const userEmail = req.user.email;

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        let hashedSenha = user.senha;
        if (senha) {
            hashedSenha = await bcrypt.hash(senha, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { email: userEmail },
            data: {
                nome: nome || user.nome,
                foto: req.file ? req.file.filename : user.foto,
                senha: hashedSenha,
                descricao: descricao || user.descricao,
                whatsApp: whatsApp || user.whatsApp,
                instagram: instagram || user.instagram,
            },
        });

        res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
};