import { isServer } from '@chpokify/helpers';
import io from 'socket.io-client';

import { socketMock } from './socketMock';

const socketConnect = (): SocketIOClient.Socket => {
  if (isServer()) {
    return socketMock;
  }

  const socket = io(process.env.BASE_API_CLIENT_URL as string, {
    transports: ['websocket'],
  });

  socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });

  return socket;
};

export {
  socketConnect,
};
