import connectMongo from 'connect-mongo';
import createSession from 'express-session';
import mongoose from 'mongoose';

const MongoStore = connectMongo(createSession);

const SESSION_TTL_SEC = 0.5 * 365 * 24 * 60 * 60;

const sessionMiddleware = createSession({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: SESSION_TTL_SEC,
    autoRemove: 'interval',
    autoRemoveInterval: 60,
  }),
  secret: process.env.APP_SECRET as string,
  resave: false,
  saveUninitialized: false,
  unset: 'keep',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SEC * 1000,
  },
  name: process.env.APP_COOKIE_SESSION_NAME,
});

export { sessionMiddleware };
