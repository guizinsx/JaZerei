# JaZerei

Aplicação web para organizar sua biblioteca de jogos: busque jogos da Steam, veja os detalhes e marque o status de cada um (zerando, quero jogar, larguei...).

> Projeto desenvolvido na faculdade, em 2024.

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Busca de jogos usando a API da Steam
- Lista de jogos populares e página de detalhes de cada jogo
- Perfil com os jogos do usuário e o status de cada um
- Organização dos jogos por categoria

## Tecnologias

**Frontend:** Next.js, React, TypeScript, Sass

**Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt

## Estrutura

```
JaZerei/
├── backend/    API REST (Express + Prisma)
└── frontend/   Interface web (Next.js)
```

O backend expõe rotas para usuários, categorias, jogos da Steam e para a lista de jogos de cada usuário. O frontend consome essa API em `http://localhost:3333`.

## Como rodar

### Pré-requisitos

- Node.js
- PostgreSQL

### Backend

1. Entre na pasta `backend` e instale as dependências:
   ```bash
   cd backend
   npm install
   ```
2. Crie um arquivo `.env` com as variáveis:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/jazerei"
   JWT_SECRET="uma-chave-secreta"
   ```
3. Rode as migrations e inicie o servidor (porta 3333):
   ```bash
   npx prisma migrate dev
   npm run dev
   ```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Depois, acesse `http://localhost:3000`.
