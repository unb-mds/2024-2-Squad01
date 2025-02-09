import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBook = async (req, res) => {
    try {
        const newBook = await prisma.book.create({
            data: {
                nome: req.body.nomeLivro,
                autor: req.body.nomeAutor,
                descricao: req.body.descricao,
                status: "Ativo",
                objetivo: req.body.objetivo,
                foto: req.file ? req.file.filename : null,
                data_de_publicacao: new Date(),
                email_publicador: req.user.email
            }
        });
        res.status(201).json({
            message: "Livro criado com sucesso",
            book: newBook
        });
    } catch (error) {
        console.error('Erro ao criar publicação do livro:', error);
        res.status(400).json({ error: 'Erro ao criar publicação de Livro' });
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        return res.json(books);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        return res.status(500).json({ error: "Erro ao buscar livros" });
    }
};