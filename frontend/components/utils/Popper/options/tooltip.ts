import { Options as PopperOptions } from '@popperjs/core';

const popperTooltipOptions: Partial<PopperOptions> = {
  placement: 'top',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 4],
      },
    },
    {
      name: 'flip',
    },
    {
      name: 'preventOverflow',
    },
  ],
};

export {
  popperTooltipOptions,
};
