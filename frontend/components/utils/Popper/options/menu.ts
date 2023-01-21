import { Options as PopperOptions } from '@popperjs/core';

const popperMenuOptions: Partial<PopperOptions> = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 4],
      },
    },
  ],
};

export {
  popperMenuOptions,
};
