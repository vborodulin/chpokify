import React from 'react';

import { reactHelpers } from '@helpers/React';

export type TStyledChildrenProps = {
  className?: string;
}

const StyledChildren: React.FunctionComponent<TStyledChildrenProps> = (props) => {
  const { className, children } = props;

  const styledChildren = React.Children
    // @ts-ignore
    .map(children, (child) => React.cloneElement(child, {
      className: `${reactHelpers.getElementClassnameProp(child)}, ${className}`,
    }));

  return (
    <>
      {styledChildren}
    </>
  );
};

export {
  StyledChildren,
};
