import React from 'react';

import { ListItem, TListItemProps } from '@components/uiKit/ListItem';

export type TMenuItemProps = TListItemProps & {
  onClose?: () => void;
};

const MenuItem = (props: TMenuItemProps) => {
  const {
    isButton,
    onClose,
    onClick,
    disabled,
    ...other
  } = props;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isButton || disabled) {
      return;
    }

    if (onClose) {
      onClose();
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ListItem
      isButton={isButton}
      disabled={disabled}
      onClick={handleClick}
      {...other}
    />
  );
};

export {
  MenuItem,
};
