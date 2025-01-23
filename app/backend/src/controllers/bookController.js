import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createBook = async (req, res) => {
    try {
        await prims.book.create({
            data: {
                nome: req.body.nomeLivro,
                autor: req.body.nomeAutor,
                descricao: req.body.descricao,
                status: "Ativo",
                foto: req.body.foto,
                data_de_publicacao: new Date(),
                email_publicador: req.user.email
            }
        })
        res.status(201).json({
            message: "Livro criado com sucesso",
            book: book
        })
    } catch (error) {
        console.error('Erro ao criar publicação do livro:', error);
        res.status(400).json({ error: 'Erro ao criar publicação de Livro' });
    }
}