import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { Layout, TSpaceNameLayoutProps } from './Layout';

export type TSpaceNameProps = Partial<TSpaceNameLayoutProps>;

const SpaceName = React.forwardRef<any, TSpaceNameProps>((props, ref) => {
  const space = useSelector(spacesSelectors.getCurrSpace);

  if (!space) {
    return null;
  }

  return (
    <Layout
      ref={ref}
      spaceName={space.name}
      {...props}
    />
  );
});

SpaceName.displayName = 'SpaceName';

export {
  SpaceName,
};
