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
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(cors({
  origin: ['http://localhost:3001', 'http://192.168.1.108:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(errorHandler)

initializePassport(passport);

app.use('/api/auth', loginRoutes);
app.use('/api/users', registerRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});