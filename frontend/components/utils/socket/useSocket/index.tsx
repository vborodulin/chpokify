import { useContext } from 'react';

import { SocketContext } from '@components/utils/socket/SocketProvider';

const useSocket = () => useContext(SocketContext);

export {
  useSocket,
};
