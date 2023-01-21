const { getGenFileCaption } = require('./getGenFIleCaption');

const getIconTSXTemplate = (name) => {
  const componentName = `${name}Component`;

  return `// @ts-nocheck
/* eslint-disable */
${getGenFileCaption()}
import React from 'react';

import { ReactComponent as ${componentName}} from './${name}.svg';

import Icon, { TIconProps } from '../Icon';

export const Icon${name} = React.forwardRef<any, TIconProps>((props, ref) => (
  <Icon
    ref={ref}
    {...props}
  >
    <${componentName}/>
  </Icon>
));
`;
};

module.exports = {
  getIconTSXTemplate,
};
