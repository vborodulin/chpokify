import { TUser } from '@chpokify/models-types';
import http from 'http';
import { Server } from 'socket.io';

import { log } from '@core/lib/logger';
import { passport } from '@core/lib/passport';
import { authMiddleware } from '@core/middleware/auth';
import { sessionMiddleware } from '@core/middleware/sessionMiddleware';

import { wrap } from './helpers/wrap';

let io: Server;

const socketConnect = async (httpServer: http.Server) => {
  io = new Server(httpServer, {
    pingInterval: 2000,
    pingTimeout: 5000,
    cors: {
      methods: ['OPTIONS', 'POST'],
      origin: true,
      credentials: true,
    },
    cookie: true,
  });

  // middlewares
  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));
  io.use(wrap(authMiddleware()));

  io.on('connection', (socket) => {
    // @ts-ignore
    const user = socket.request.user as TUser;
    log.info({
      methodName: 'socketConnect',
      userId: user._id,
    }, 'connected');

    socket.on('disconnect', (reason: string) => {
      log.error({
        methodName: 'socketConnect',
        userId: user._id,
      }, 'disconnected', user._id, reason);
    });

    socket.on('joinRoom', (data: { roomId: string }) => {
      const { roomId } = data;
      log.info({
        methodName: 'socketConnect',
        userId: user._id,
        roomId,
      }, 'join room');
      socket.join(roomId);
    });

    socket.on('leaveRoom', (data: { roomId: string }) => {
      const { roomId } = data;
      log.info({
        methodName: 'socketConnect',
        userId: user._id,
        roomId,
      }, 'leave room');
      socket.leave(roomId);
    });
  });
};

export {
  io,
  socketConnect,
};
