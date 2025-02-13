import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.book.deleteMany({});
    await prisma.user.deleteMany({});

    const senhaPadrao = "123";
    const hashedSenha = await bcrypt.hash(senhaPadrao, 10);

    await prisma.user.createMany({
        data: [
            {
                email: 'analuiza@exemplo.com',
                nome: 'Ana Luiza',
                senha: hashedSenha,
                foto: 'AnaL.jpeg',
                whatsApp: '111111111',
                instagram: 'analuiza'
            },
            {
                email: 'gabriel@exemplo.com',
                nome: 'Gabriel',
                senha: hashedSenha,
                foto: 'Gabriel.jpeg',
                whatsApp: '222222222',
                instagram: 'gabriel'
            },
            {
                email: 'joao@exemplo.com',
                nome: 'Joao',
                senha: hashedSenha,
                foto: 'Joao.jpeg',
                whatsApp: '333333333',
                instagram: 'joao'
            },
            {
                email: 'mariaclara@exemplo.com',
                nome: 'Maria Clara',
                senha: hashedSenha,
                foto: 'MariaClara.jpeg',
                whatsApp: '444444444',
                instagram: 'mariaclara'
            },
            {
                email: 'mariaeduarda@exemplo.com',
                nome: 'Maria Eduarda',
                senha: hashedSenha,
                foto: 'MariaEduarda.jpeg',
                whatsApp: '555555555',
                instagram: 'mariaeduarda'
            },
            {
                email: 'mylena@exemplo.com',
                nome: 'Mylena',
                senha: hashedSenha,
                foto: 'Mylena.jpeg',
                whatsApp: '666666666',
                instagram: 'mylena'
            }
        ]
    });

    await prisma.book.createMany({
        data: [
            {
                nome: "Eragon",
                autor: "Christopher Paolini",
                descricao: "Um livro de fantasia sobre dragões e aventura.",
                status: "Ativo",
                objetivo: "Doar",
                foto: "eragon.jpeg",
                data_de_publicacao: new Date(),
                email_publicador: 'analuiza@exemplo.com'
            },
            {
                nome: "Harry Potter e a Pedra Filosofal",
                autor: "J.K. Rowling",
                descricao: "O início das aventuras de Harry Potter.",
                status: "Ativo",
                objetivo: "Doar",
                foto: "harrypotter.jpg",
                data_de_publicacao: new Date(),
                email_publicador: 'gabriel@exemplo.com'
            },
            {
                nome: "Percy Jackson e os Olimpianos",
                autor: "Rick Riordan",
                descricao: "Um jovem descobre ser um semideus e enfrenta desafios mitológicos.",
                status: "Ativo",
                objetivo: "Trocar",
                foto: "percy.jpg",
                data_de_publicacao: new Date(),
                email_publicador: 'joao@exemplo.com'
            }
        ]
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });