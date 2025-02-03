import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import cors from 'cors';
import initializePassport from './config/passport.js';
import loginRoutes from './routes/loginRoute.js';
import registerRoutes from './routes/registerRoute.js';
import bookRoutes from './routes/bookRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

//Configuração de Integração
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Mensagens flash
app.use(flash());


//Configuração do Cors 
app.use(cors({
  origin: ['http://localhost:3001', 'http://192.168.0.249:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Inicialização de Sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  },
  name: 'sessionId'
}));

//Inicialização da configuração do Passport
initializePassport(passport);

//Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


//Rotas 
app.use('/auth', loginRoutes);
app.use('/users', registerRoutes);
app.use('/books', bookRoutes)

app.use(errorHandler)

//Configuração da porta
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});