import base from 'paths.macro';
import React from 'react';

import { Paper } from '@components/uiKit/Paper';
import { Text } from '@components/uiKit/Text';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Card = () => (
  <Paper
    variant="card"
    maxWidth={500}
  >
    <Text>
      Quisque aliquam sem in sapien laoreet, in cursus lectus varius.
      Aliquam venenatis eu sem in lobortis. Pellentesque gravida enim turpis,
      in eleifend quam hendrerit sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Donec convallis mi molestie nibh molestie pellentesque pulvinar nec mi.
      Nam cursus bibendum enim, eu laoreet urna. Etiam vitae ex ut ex ullamcorper pellentesque sit amet ut tortor.
      Cras posuere ac nibh et aliquam.
    </Text>
  </Paper>
);

export const Modal = () => (
  <Paper
    variant="modal"
    maxWidth={500}
  >
    <Text>
      Quisque aliquam sem in sapien laoreet, in cursus lectus varius.
      Aliquam venenatis eu sem in lobortis. Pellentesque gravida enim turpis,
      in eleifend quam hendrerit sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Donec convallis mi molestie nibh molestie pellentesque pulvinar nec mi.
      Nam cursus bibendum enim, eu laoreet urna. Etiam vitae ex ut ex ullamcorper pellentesque sit amet ut tortor.
      Cras posuere ac nibh et aliquam.
    </Text>
  </Paper>
);

export const Popover = () => (
  <Paper
    variant="popover"
    maxWidth={500}
  >
    <Text>
      Quisque aliquam sem in sapien laoreet, in cursus lectus varius.
      Aliquam venenatis eu sem in lobortis. Pellentesque gravida enim turpis,
      in eleifend quam hendrerit sed. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Donec convallis mi molestie nibh molestie pellentesque pulvinar nec mi.
      Nam cursus bibendum enim, eu laoreet urna. Etiam vitae ex ut ex ullamcorper pellentesque sit amet ut tortor.
      Cras posuere ac nibh et aliquam.
    </Text>
  </Paper>
);
