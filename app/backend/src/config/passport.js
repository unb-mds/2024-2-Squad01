import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function initializePassport(passport) {
    const authenticateUser = async (email, senha, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado' });
            }

            if (await bcrypt.compare(senha, user.senha)) {
                return done(null, user);
            }

            return done(null, false, { message: 'Senha incorreta' });
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'senha' },
        authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser(async (email, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}