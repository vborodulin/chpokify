const SOCKET_IO_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.0/socket.io.min.js';

self.importScripts(SOCKET_IO_CDN_URL);

let socket = null;
const SUBSCRIBE_CB_MAP = {};

const CONNECT_EVENT = 'connect';
const CONNECT_ERROR_EVENT = 'connect_error';
const DISCONNECT_EVENT = 'disconnect';
const RECONNECT_ATTEMPT = 'reconnect_attempt';

const DISCONNECT_REASON = {
  serverDisconnect: 'io server disconnect',
  clientDisconnect: 'io client disconnect',
  pingTimeout: 'ping timeout',
  transportClose: 'transport close',
  transportError: 'transport error',
};

const CONNECT_ERROR_TIMEOUT = 1000;

let hasLog = true;

const log = (method, ...arg) => {
  if (!hasLog) return;
  console.log(method, ...arg);
};

const handleConnect = (data) => {
  socket = io(data.url, {
    transports: ['websocket'],
    reconnectionDelay: 500,
  });
  hasLog = data.hasLog;

  log('[sww]: handleConnect', data);

  socket.on(RECONNECT_ATTEMPT, () => {
    socket.io.opts.transports = ['polling', 'websocket'];
    log('[sww]: event: reconnect_attempt');
  });

  socket.on(CONNECT_EVENT, () => {
    log('[sww]: event: connect');
  });

  socket.on(CONNECT_ERROR_EVENT, (err) => {
    log('[sww]: event: connect_error', err.message);

    setTimeout(() => {
      socket.connect();
    }, CONNECT_ERROR_TIMEOUT);
  });

  socket.on(DISCONNECT_EVENT, (reason) => {
    log('[sww]: event: disconnect', reason);

    if (reason === DISCONNECT_REASON.serverDisconnect) {
      socket.connect();
    }
  });
};

const handleDisconnect = () => {
  if (socket) {
    socket.disconnect();
  }

  log('[sww]: handleDisconnect');
};

const handleEmit = (data) => {
  if (!socket) {
    return;
  }

  log('[sww]: handleEmit', data);
  const {
    eventName,
    args,
  } = data;
  socket.emit(eventName, args);
};

const handleSubscribe = (data) => {
  if (!socket) {
    return;
  }

  log('[sww]: handleSubscribe', data);
  const { eventName } = data;

  const cb = (args) => {
    log('[sww]: handleSubscribe callback call', data, args);

    try {
      postMessage({
        eventName,
        args,
      });
    } catch (err) {
      // do nothing
    }
  };

  SUBSCRIBE_CB_MAP[eventName] = cb;
  socket.on(eventName, cb);
};

const handleUnsubscribe = (data) => {
  if (!socket) {
    return;
  }

  log('[sww]: handleUnsubscribe', data);
  const { eventName } = data;
  const cb = SUBSCRIBE_CB_MAP[eventName];
  socket.off(eventName, cb);
};

onmessage = (msg) => {
  const { data } = msg;

  switch (data.type) {
    case 'connect':
      handleConnect(data);
      break;
    case 'disconnect':
      handleDisconnect(data);
      break;
    case 'emit':
      handleEmit(data);
      break;
    case 'subscribe':
      handleSubscribe(data);
      break;
    case 'unsubscribe':
      handleUnsubscribe(data);
      break;
    default:
      break;
  }
};
