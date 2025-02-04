import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export default function initializePassport(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, async (email, senha, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado' });
            }

            const match = await bcrypt.compare(senha, user.senha);
            if (!match) {
                return done(null, false, { message: 'Senha incorreta' });
            }

            console.log('Usuário autenticado:', user);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        console.log('Serializando usuário:', user.email);
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return done(null, false);
            }
            console.log('Deserialização bem-sucedida:', user.email);
            return done(null, user);
        } catch (error) {
            console.error('Erro na deserialização:', error);
            return done(error);
        }
    });
}