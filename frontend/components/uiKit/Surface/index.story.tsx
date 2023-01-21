import base from 'paths.macro';
import React from 'react';

import { Surface } from '@components/uiKit/Surface/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Card = () => (
  <Surface
    variant="card"
    width={200}
    height={200}
  />
);

export const Modal = () => (
  <Surface
    variant="modal"
    width={200}
    height={200}
  />
);

export const Popover = () => (
  <Surface
    variant="popover"
    width={200}
    height={200}
  />
);
