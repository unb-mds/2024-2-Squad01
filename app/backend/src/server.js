import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import cors from 'cors';
import methodOverride from 'method-override';
import next from 'next';                  // <-- Importamos o Next
import initializePassport from './config/passport.js';
import loginRoutes from './routes/loginRoute.js';
import registerRoutes from './routes/registerRoute.js';
import bookRoutes from './routes/bookRoute.js';
import passport from 'passport';
import sessionStore from './config/sessionStore.js';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './frontend' });
const handle = nextApp.getRequestHandler();

const app = express();

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
      maxAge: 24 * 60 * 60 * 1000
    },
    name: 'sessionId'
  }));

  initializePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));

  app.use('/auth', loginRoutes);
  app.use('/users', registerRoutes);
  app.use('/books', bookRoutes);

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Servidor unificado rodando na porta ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Erro ao iniciar servidor:', err);
});