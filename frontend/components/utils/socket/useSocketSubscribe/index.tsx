import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { systemSelectors } from '@Redux/domains/system/selectors';

import { SocketContext } from '@components/utils/socket/SocketProvider';
import { SOCKET_STATUS } from '@components/utils/types';

const useSocketSubscribe = (eventName: string, cb: Function) => {
  const socket = useContext(SocketContext);
  const socketStatus = useSelector(systemSelectors.getSocketStatus);

  useEffect(() => {
    if (!eventName || !socket || socketStatus !== SOCKET_STATUS.CONNECTED) {
      return;
    }

    const roomId = eventName;
    const event = eventName;

    socket.emit('joinRoom', {
      roomId,
    });

    socket.on(event, cb);

    return function useSocketCleanup() {
      socket.emit('leaveRoom', {
        roomId,
      });
      socket.off(event);
    };
  }, [eventName, socket, socketStatus]);

  return socket;
};

export {
  useSocketSubscribe,
};
