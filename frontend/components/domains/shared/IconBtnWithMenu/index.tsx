import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { uiSelectors } from '@Redux/domains/ui/selectors';

import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconMoreHorizontal, IconMoreVertical } from '@components/uiKit/Icons';

import { Popper, TPopperProps } from '@components/utils/Popper';
import { popperMenuOptions } from '@components/utils/Popper/options/menu';

export type TIconBtnWithMenuProps = Partial<TIconButtonProps> & {
  popperId: string;
  menu: React.ReactElement | null;
  popperProps?: Omit<Partial<TPopperProps>, 'id'>;
  icon?: React.ReactElement | null;
  iconStyledType?: 'horizontally' | 'vertical'
};

const IconBtnWithMenu = (props: TIconBtnWithMenuProps): React.ReactElement | null => {
  const {
    popperId,
    menu,
    popperProps = {},
    iconStyledType,
    icon,
    ...other
  } = props;

  const isOpen = useSelector(uiSelectors.getPopperIsOpen)(
    popperId
  );
  const [targetElement, setTargetElement] = useState<any>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const renderIcon = () => {
    if (icon) {
      return icon;
    }

    if (iconStyledType === 'horizontally') {
      return (
        <IconMoreHorizontal />
      );
    }

    return (
      <IconMoreVertical />
    );
  };

  if (!menu) {
    return null;
  }

  return (
    <>
      <IconButton
        ref={setTargetElement}
        isHover={isOpen}
        onClick={handleClick}
        {...other}
      >
        {
          renderIcon()
        }
      </IconButton>

      <Popper
        id={popperId}
        targetElement={targetElement}
        options={popperMenuOptions}
        {...popperProps}
      >
        {menu}
      </Popper>
    </>
  );
};

export {
  IconBtnWithMenu,
};
