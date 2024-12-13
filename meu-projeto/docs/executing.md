# UNBook - Plataforma de Troca e Doação de Livros

## Visão Geral

Este projeto é uma plataforma com o objetivo de criar um ambiente onde os usuários podem trocar ou doar livros. A ideia principal é que os estudantes da Universidade de Brasília (UnB) possam postar os livros que desejam trocar ou doar, para que outros estudantes possam propor trocas caso se interessem.

## 📝 Sumário

- [Como Executar o Projeto](#como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Ambiente](#ambiente)
  - [Dependências do Projeto](#dependências-do-projeto)
  - [Execução](#execução)
  - [Autenticação com Google OAuth](#autenticação-com-google-oauth)
  - [Acesso aos Serviços](#acesso-aos-serviços)
  - [Migrations](#migrations)

## Como Executar o Projeto

### 📋 Pré-requisitos

Para rodar o projeto, você precisa instalar as seguintes dependências globais:

- **GNU Make** 4.3 (ou superior)
- **Node.js** v20.9.0 e **NPM** v10.1.0 (ou superior)
- **Docker Engine** v24.0.6 e **Docker Compose** v2.21.0 (ou superior)
- **MySQL** (para o banco de dados)
- **Prisma ORM** (para interação com o banco de dados)

### 💻 Ambiente

Para configurar o ambiente, execute o seguinte script:

```bash
make config

### 📁 Dependências do Projeto

# Instalar dependências do frontend (React, Next.js)
cd frontend
npm install

# Instalar dependências do backend (Node.js, Prisma)
cd backend
npm install

### 💾 Execução

docker compose up

###🖱️ Acesso aos Serviços
Serviço	          URL
Frontend	http://localhost:3000
Backend	    http://localhost:8000

###📍 Migrations



Crie as migrations
npx prisma migrate dev

# Execute as migrations
npx prisma migrate deploy

###💻 Tecnologias Utilizadas
Backend
Node.js com Express
MySQL- para o banco de dados
Prisma- ORM para interação com o banco de dados
Frontend
Next.js
React
CSS com Tailwind e Bootstrap

###📍 Requisitos Funcionais
Cadastro de Usuário: O sistema deve permitir que o usuário se cadastre com nome, e-mail e senha.
Login e Autenticação: O sistema deve permitir que o usuário faça login com e-mail ou Google.
Cadastro de Livros: O sistema deve permitir ao usuário cadastrar livros para doação ou troca.
Troca de Livros: O sistema deve permitir que o usuário proponha troca de livros.
Filtragem de Livros: O sistema deve permitir a filtragem de livros disponíveis para doação ou troca.

###📍 Requisitos Não Funcionais
Desempenho: Suporte até 1000 usuários simultâneos.
Segurança: Criptografia das senhas e proteção contra ataques.
Usabilidade: Interface amigável e responsiva.
Escalabilidade: Sistema projetado para crescimento de usuários e dados.


###📄 Licença
Este projeto é licenciado sob a Licença MIT.

Este README segue as boas práticas para documentação de projetos, incluindo instruções claras sobre como rodar o projeto, suas dependências e como usar o sistema.
