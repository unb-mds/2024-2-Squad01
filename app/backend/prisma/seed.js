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
                nome: "Matéria Escura",
                autor: "Blake Crouch",
                descricao: "Matéria Escura é um thriller de ficção científica que explora realidades paralelas e as escolhas que definem nossa vida.",
                status: "Ativo",
                objetivo: "Doar",
                foto: "materia.png",
                data_de_publicacao: new Date(),
                email_publicador: 'analuiza@exemplo.com'
            },
            {
                nome: "Em algum lugar nas estrelas",
                autor: "Clare Vanderpool",
                descricao: "Em Algum Lugar na Estrela de Mário de Andrade é uma obra que mistura poesia e prosa, explorando temas de amor, solidão e a busca por identidade no contexto urbano.",
                status: "Ativo",
                objetivo: "Doar",
                foto: "estrela.png",
                data_de_publicacao: new Date(),
                email_publicador: 'gabriel@exemplo.com'
            },
            {
                nome: "A Vida Invisível de Addie LaRue",
                autor: "V.E. Schwab",
                descricao: "A Vida Invisível de Addie LaRue segue uma mulher imortal esquecida por todos, enquanto busca deixar sua marca no mundo.",
                status: "Ativo",
                objetivo: "Trocar",
                foto: "livro.png",
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