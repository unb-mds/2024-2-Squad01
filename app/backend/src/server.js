import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import cors from 'cors';
import methodOverride from 'method-override';
import next from 'next';
import initializePassport from './config/passport.js';
import loginRoutes from './routes/loginRoute.js';
import registerRoutes from './routes/registerRoute.js';
import bookRoutes from './routes/bookRoute.js';
import chatRoutes from './routes/chatRoutes.js';
import passport from 'passport';
import sessionStore from './config/sessionStore.js';
import fs from 'fs';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './frontend' });
const handle = nextApp.getRequestHandler();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const PORT = process.env.PORT || 3002;
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('mensagem', ({ senderId, receiverId, conteudo }) => {
    io.to(receiverId).emit('mensagemRecebida', { senderId, conteudo });
  });

  socket.on('setUserId', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

async function main() {
  await nextApp.prepare();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(cors());

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
    name: 'sessionId',
  }));

  initializePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));

  app.use('/uploads', express.static(uploadDir));

  app.use('/auth', loginRoutes);
  app.use('/users', registerRoutes);
  app.use('/books', bookRoutes);
  app.use('/chat', chatRoutes);

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(PORT, () => {
    console.log(`Servidor unificado rodando na porta ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Erro ao iniciar servidor:', err);
});