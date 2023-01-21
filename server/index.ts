import { socketConnect } from '@socket';
import config from 'config';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';

import { db } from '@core/lib/db';
import { log } from '@core/lib/logger';
import { initMailer } from '@core/lib/mailer';
import { configurePassport } from '@core/lib/passport';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

/* eslint-disable */
import { app } from './app';

// register mongoose models
import '@models/user';
import '@models/space';
import '@models/pokerSession';
import '@models/kanban';
import '@models/story';
import '@models/customer';
import '@models/pokerCardDeck';
import '@models/retroSession';
import '@models/retroTemplate';
import '@models/retroCard';
import '@models/retroRelations';
import '@core/lib/redis';
import '@queue';
import { sentryInit } from '@core/lib/sentry';

/* eslint-enable */

http.globalAgent.maxSockets = Infinity;
// @ts-ignore
global.__rootdir__ = path.resolve(__dirname, '../');

sentryInit(app);

const ADDRESS = process.env.APP_ADDRESS as string;
const PORT = Number(process.env.APP_PORT);
const SHUTDOWN_TIME = config.get('app.shutdownTime') as number;

const main = async () => {
  await db.connect();
  await initMailer();
  const httpServer = http.createServer(app);

  configurePassport();

  const server = await httpServer.listen(PORT, ADDRESS);
  log.info({
    mathodName: 'main',
    address: ADDRESS,
    port: PORT,
  }, 'server is listening');

  await socketConnect(httpServer);
  log.info({ methodName: 'main' }, 'socket connected');

  process.on('SIGINT', async () => {
    await db.mongoose.connection.close();

    server.close(() => {
      log.warn('closed out remaining connections');
      process.exit(0);
    });

    setTimeout(() => {
      log.error('could not close connections in time, forcing shut down');
      process.exit(1);
    }, SHUTDOWN_TIME);
  });
};

main()
  .catch((err) => {
    log.error({
      err,
      methodName: 'main',
    }, 'unhandled error');
    process.exit(1);
  });
