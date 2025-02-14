import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import { Sequelize } from 'sequelize';

const dbUrl = process.env.NODE_ENV === 'development'
    ? process.env.SHADOW_DATABASE_URL
    : process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, { dialect: 'postgres', logging: false });

const SessionStore = SequelizeStore(session.Store);
const sessionStore = new SessionStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});

await sessionStore.sync();

export default sessionStore;