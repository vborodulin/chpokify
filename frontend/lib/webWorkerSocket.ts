import { ENVIRONMENT } from '@chpokify/models-types';

export class WebWorkerSocket {
  private eventCbMap: Record<string, Function | undefined> = {};

  public constructor(private worker: Worker) {
    this.worker.onmessage = (event: MessageEvent) => {
      const { data } = event;
      const cb = this.eventCbMap[data.eventName];

      if (!cb) {
        return;
      }

      cb(data.args);
    };
  }

  public disconnect() {
    this.worker.postMessage({
      type: 'disconnect',
    });
    this.worker.terminate();
  }

  public emit(eventName: string, args: any) {
    this.worker.postMessage({
      type: 'emit',
      eventName,
      args,
    });
  }

  public on(eventName: string, cb: Function) {
    this.worker.postMessage({
      type: 'subscribe',
      eventName,
    });

    this.eventCbMap[eventName] = cb;
  }

  public off(eventName: string) {
    this.worker.postMessage({
      type: 'unsubscribe',
      eventName,
    });

    delete this.eventCbMap[eventName];
  }
}

class WebWorkerIO {
  private worker: Worker;

  public constructor() {
    this.worker = new Worker('/socket.worker.js');
  }

  public connect() {
    this.worker.postMessage({
      type: 'connect',
      url: process.env.BASE_API_CLIENT_URL,
      hasLog: process.env.NODE_ENV !== ENVIRONMENT.PRODUCTION,
    });

    return new WebWorkerSocket(this.worker);
  }
}

export {
  WebWorkerIO,
};
