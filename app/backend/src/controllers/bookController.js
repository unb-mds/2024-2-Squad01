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
        const books = await prisma.book.findMany({
            include: {
                publicador: {
                    select: { foto: true, nome: true },
                },
            },
        });

        const formattedBooks = books.map((book) => ({
            ...book,
            userPhoto: book.publicador?.foto || '',
            username: book.publicador?.nome || 'Usuário Desconhecido',
        }));

        res.status(200).json(formattedBooks);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const bookId = parseInt(id);

        const book = await prisma.book.findUnique({ where: { id: bookId } });
        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        if (book.email_publicador !== req.user.email) {
            return res.status(403).json({ error: "Você não tem permissão para deletar este livro." });
        }

        await prisma.book.delete({ where: { id: bookId } });
        res.status(200).json({ message: "Livro deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar livro:", error);
        res.status(500).json({ error: "Erro interno ao deletar livro." });
    }
};