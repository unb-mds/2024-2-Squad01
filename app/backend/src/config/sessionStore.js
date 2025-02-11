import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false
});

const SessionStore = SequelizeStore(session.Store);
const sessionStore = new SessionStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});

await sessionStore.sync();

export default sessionStore;