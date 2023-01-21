import { Socket } from 'socket.io';

const wrap = (middleware: any) => (socket: Socket, next: (err?: any) => void) => {
  middleware(socket.request, {}, next);
};

export {
  wrap,
};
