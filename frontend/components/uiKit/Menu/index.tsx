import React, { useRef } from 'react';
import { css } from 'styled-components';

import { Paper, TPaperProps } from '@components/uiKit/Paper';

import { useEventListener } from '@components/utils/hooks/useEventListener';

import { reactHelpers } from '@helpers/React';

export type TMenuProps = Partial<TPaperProps> & {
  preventClick: boolean;
};

const Menu = React.forwardRef<any, TMenuProps>((props, ref) => {
  const {
    preventClick,
    ...other
  } = props;
  const localRef = useRef<any>(null);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  useEventListener(
    preventClick ? localRef.current : null,
    'click',
    handleClick
  );

  return (
    <Paper
      ref={reactHelpers.mergeRefs([ref, localRef])}
      p={0}
      variant="popover"
      width="180px"
      borderRadius={2}
      css={css`user-select: none z-index: 1;`}
      {...other}
    />
  );
});

Menu.displayName = 'Menu';

export {
  Menu,
};
