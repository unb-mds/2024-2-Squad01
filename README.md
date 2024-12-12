# 2024-2-Squad01
## Visão Geral
Este projeto é uma plataforma com o objetivo de criar um ambiente onde os usuários podem trocar ou doar livros. A ideia principal é que os estudantes da unb possam postar os livros que desejam trocar ou doar para que outros estudantes caso interessados proponham algo em caso de troca.

## Tecnologias Utilizadas
Para o desenvolvimento do backend a equipe utilizará:
- JavaScript como linguagem base do backend com o apoio do framework express e node.js
- MySQL para a elaboração do banco de dados, com apoio do Prisma.


Para o desenvolvimento do frontend a equipe utilizará:
- Next.js
- JavaScript com React.
- CSS com componentes do Bootstrap e bibliotecas do tailwind.

## Documentação sobre os Padrões de Commit

 Aqui serão exibidos os padrões de commits que a equipe deverá seguir para a organização do histórico de desenvolvimento do projeto 

 > [tipo](Escopo da Alteração): Descrição

### Tipo
Neste campo, será descrito qual tipo de alteração o commit descreve. Exemplo
- Feat: descreve novas funcionalidades.
- Fix: descreve o ajuste de funcionalidades anteriormente implementadas.
- Docs: descreve alterações na documentação do projeto.
- Style: descreve alterações na estilização do projeto.
- Deps: descreve instalação de dependencias.

### Escopo
Neste campo, será descrito qual parte do projeto foi alterada. Exemplo
- Pagina Login.

### Descrição 
Neste campo, deverá ser descrito com detalhes a mudança.

### Exemplo de Commit
- "[docs](Padronização de Commits): Criado o arquivo que define os padrões de commit que a equipe seguirá durante o desenvolvimento do projeto"


## Fluxograma 
![Texto alternativo](/docs/Fluxograma/fluxograma.png)

Este fluxograma apresenta a estrutura de navegação de um sistema, detalhando as interações possíveis entre as diferentes páginas. Ele organiza o fluxo das ações de forma clara e intuitiva. Abaixo, estão descritas as principais seções do sistema:

### 1. Página Inicial
Ponto de entrada do sistema, com opções para login ou cadastro.

### 2. Login
O usuário pode fazer login utilizando e-mail ou nome de usuário.  
Em caso de problemas, há a opção de redefinir a senha, que envolve o envio de um e-mail de recuperação e o registro de uma nova senha.  
Se o usuário não tiver uma conta, pode se cadastrar.

### 3. Cadastro
Processo que exige informações pessoais e validação por e-mail antes de acessar a plataforma.

### 4. Feed
Exibição dos posts com os livros anunciados.

### 5. Meu Perfil
- Editar perfil
- Visualização dos meus posts

### 6. Meus posts
Possibilidade de editar posts e visualizar suas informações.

### 7. Anunciar
O usuário coloca título, descrição, gênero, fotos e define se quer trocar ou doar.

### 8. Sobre Nós
Um pouquinho sobre nós e sobre o nosso projeto.

### 9. Perfis dos usuários
Posts dos usuários.

### 10. Posts dos usuários
Informações dos livros anunciados por outros usuários.

### 11. Barra de Pesquisa
Exibição dos posts de acordo com a pesquisa do usuário.


## Requisitos Funcionais

### 1. Cadastro de Usuário
- O sistema deve permitir que o usuário se cadastre utilizando nome, email e senha.
- O sistema deve validar os dados fornecidos durante o cadastro (ex: formato correto de email).
- O usuário deve receber um email de confirmação após o cadastro.

### 2. Login e Autenticação
- O sistema deve permitir que o usuário faça login utilizando email e senha.
- O sistema deve permitir a autenticação do usuário utilizando login com Google.

### 3. Gerenciamento de Perfil
- O usuário deve ser capaz de editar seu perfil (nome, email, foto de perfil, contatos, etc).
- O sistema deve permitir que o usuário visualize seu perfil completo.

### 4. Cadastro de Livros
- O usuário deve poder cadastrar livros em seu perfil, incluindo título, autor, descrição e foto.
- O usuário deve escolher se o livro está disponível para doação ou troca.
- O sistema deve permitir que o usuário defina o status do livro (disponível ou não). O status de um livro deve ser atualizado para "doado" ou "trocado" assim que o usuário finalizar a doação ou troca. 

### 5. Troca de Livros
- O sistema deve permitir que o usuário envie uma proposta de troca de livros.
- O usuário deve poder visualizar livros de outros usuários disponíveis para troca.
- A troca de livros não será finalizada dentro do sistema, o usuário será redirecionado para plataformas externas.

### 6. Filtragem de Livros
- O sistema deve permitir que o usuário filtre livros disponíveis para doação ou troca.
- O sistema deve permitir que o usuário veja apenas livros que ele pode pegar (baseado no limite de 3 livros por mês).

## Requisitos Não Funcionais

### 1. Desempenho
- O sistema deve ser capaz de suportar até 1000 usuários simultâneos sem degradação perceptível na performance.

### 2. Segurança
- O sistema deve utilizar criptografia (hash) para armazenar senhas dos usuários.
- A autenticação deve ser realizada de forma segura, utilizando OAuth para login via Google.
- O sistema deve ter proteção contra ataques comuns, como SQL Injection e Cross-Site Scripting (XSS).

### 3. Usabilidade
- O sistema deve ter uma interface amigável e intuitiva, permitindo fácil navegação entre as funcionalidades.
- A interface deve ser responsiva, garantindo que o sistema funcione bem em dispositivos móveis e desktops.

### 4. Manutenibilidade
- O código do sistema deve ser modular, com boa documentação para facilitar futuras manutenções e atualizações.

### 5. Escalabilidade
- O sistema deve ser projetado de maneira que permita aumentar a capacidade de usuários e dados sem necessidade de grandes modificações na arquitetura.

## Regras de Negócio

### 1. Limite de Livros
- Cada usuário pode pegar até 3 livros doados por mês.

## Modelagem do BD

### Modelo Conceitual
![Texto alternativo](/docs/Diagramas/Conceitual_Unbookinho.png)

### Modelo Lógico
![Texto alternativo](/docs/Diagramas/Lógico_Unbookinho.png)

### Story Map e Activity Flow
[Story Map](https://miro.com/welcomeonboard/TzZyV05mVk4zd3p3MXA1TFFlWmFpVGlDdVNJeGU2SEYzcHZYcVY5ZGJia0VPbHdSUG1VcVM0ZXR6OC9NVk8vR1lJTXhIa3RyY25vdFdNRDRhWGo4RUZjdjRkVVM2ZlkrVElIK1FWK2p5Y3Z5RjNUSEVBdzdvU1M0Z2xjcTRGVFchZQ==?share_link_id=536395178631)

[Activity Flow](https://miro.com/welcomeonboard/b2g4elZpMXlJZmo2MHltdkREVXVzM2I2S2t6Q3I1WHF5QjRyRlJjRnR6MmFhblhMTXppT1FtaHBtajhqZHBBSm1MSi9jWUxXQ2hwcERDUHdLVnBZS1ZjdjRkVVM2ZlkrVElIK1FWK2p5Y3Z5RjNUSEVBdzdvU1M0Z2xjcTRGVFchZQ==?share_link_id=51855470267)

### Protótipo de Alta Fidelidade
[Figma](https://www.figma.com/design/pDVhMZyZLkV8CzTreyhRpY/UNBook-FGA?node-id=0-1&m=dev&t=B4W17iuhvONrF6ws-1)





