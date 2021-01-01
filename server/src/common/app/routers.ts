import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as connectMongoDB from 'connect-mongodb-session';
import * as compression from 'compression';
import * as helmet from 'helmet';
const MongoDBStore = connectMongoDB(session);
const store = new MongoDBStore({
        uri: process.env.DB_URL,
        collection: 'token',
        expires: 86400 * 2,
});

export const router = (app: INestApplication) => {
        app.use(cookieParser());
        app.use(morgan('dev'));
        app.use(helmet());
        app.use(compression());
        app.use(
                session({
                        secret: process.env.SESSION_SECRET_KEY,
                        name: 'sessionId',
                        saveUninitialized: true,
                        resave: true,
                        store: store,
                        cookie: {
                                maxAge: 60 * 60 * 24 * 3,
                        },
                }),
        );
        //initialized i18n
        app.use((req, res, next) => {
                next();
        });
};
