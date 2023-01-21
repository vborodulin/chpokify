import { useEffect } from 'react';

type THandler = (event: any) => void

const useEventListener = (
  target: EventTarget | null,
  eventName: string,
  handler: THandler | null,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    if (!handler || !target) {
      return;
    }

    const isSupported = 'addEventListener' in target;

    if (!isSupported) {
      return;
    }

    const eventListener = (event: Event) => {
      if (handler) {
        handler(event);
      }
    };

    target.addEventListener(eventName, eventListener, options);

    return () => {
      target.removeEventListener(eventName, eventListener, options);
    };
  }, [target, eventName, handler]);
};

export { useEventListener };
