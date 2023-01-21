import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import shortid from 'shortid';

import { IconBtnWithMenu, TIconBtnWithMenuProps } from '@components/domains/shared/IconBtnWithMenu';

import { CardMenu } from './CardMenu';

export type TCardMenuBtnProps = Partial<TIconBtnWithMenuProps> & {
  cardId: TEntityID;
  columnId: TEntityID;
  isColumnAction: boolean;
  onClose: () => void;
};

const CardMenuBtn = (props: TCardMenuBtnProps): React.ReactElement | null => {
  const {
    cardId,
    columnId,
    isColumnAction,
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`retroCardMenu-${shortid()}`);

  return (
    <IconBtnWithMenu
      p={0}
      popperId={menuPopperIdRef.current}
      iconStyledType="vertical"
      menu={(
        <CardMenu
          cardId={cardId}
          columnId={columnId}
          isColumnAction={isColumnAction}
          {...other}
        />
      )}
      {...other}
    />
  );
};

export {
  CardMenuBtn,
};
