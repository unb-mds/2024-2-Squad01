# Arquitetura

## Visão Geral

A arquitetura do sistema é composta por 2 aplicações: o backend e o frontend. O backend é responsável por fornecer uma API REST que apresenta as seguintes funcionalidades:

- Usuários:
    - Autenticação
    - Armazenamento de livros cadastrados
- Livros:
    - Cadastro de livros

O frontend é responsável por consumir a API REST e apresentar as informações para o usuário final. O fluxo da aplicação se dá da seguinte forma:

1. O usuário acessa o site para trocas e doações de livros
2. O usuário seleciona os livros que deseja trocar ou doar
3. O usuário cadastra um livro que quer disponibilizar
4. O usuário pode realizar trocas ou registrar a doação

## Design do Sistema

O design do sistema foi feito utilizando a ferramenta [Figma](https://www.figma.com/design/pDVhMZyZLkV8CzTreyhRpY/UNBook-FGA?node-id=0-1&m=dev) e comporta-se da seguinte forma:

1. O usuário acessa o site e é apresentado com a tela de login
2. O usuário pode se cadastrar ou logar com uma conta existente
3. Após o login, a aplicação recebe um token de autenticação e a API gerencia as informações do usuário
4. O usuário pode buscar por livros cadastrados por título ou autor
5. O usuário pode cadastrar novos livros para troca ou doação
6. O usuário pode ver as opções de livros disponíveis para troca ou doação
7. O salvamento das informações é feito no Banco de Dados e a API gerencia o armazenamento

### Lógica da criação de cadastro de livros

A criação do cadastro de livros envolve a coleta de informações como título, autor, descrição e estado do livro. Após o cadastro, os dados são armazenados no banco de dados para que outros usuários possam visualizar ou interagir com o livro.

O sistema também oferece uma interface para filtrar e buscar livros com base nesses critérios, facilitando a troca ou doação.

## Tecnologias Utilizadas

### Backend

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [JWT](https://jwt.io) para autenticação
- [Heroku](https://www.heroku.com) para deploy

### Frontend

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com) para deploy
