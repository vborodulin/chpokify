import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import shortid from 'shortid';

import {
  PokerSessionMenu,
  TPokerSessionMenuProps,
} from '@components/domains/poker/PokerSessionMenuWithBtn/PokerSessionMenu';
import { IconBtnWithMenu, TIconBtnWithMenuProps } from '@components/domains/shared/IconBtnWithMenu';

export type TPokerSessionMenuWithBtnProps = Partial<TIconBtnWithMenuProps> & {
  pokerSessionId: TEntityID;
  menuProps?: Partial<TPokerSessionMenuProps>;
}

const PokerSessionMenuWithBtn = (props: TPokerSessionMenuWithBtnProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    menuProps,
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`pokerSessionEditMenu-${shortid()}`);

  return (
    <IconBtnWithMenu
      popperId={menuPopperIdRef.current}
      menu={(
        <PokerSessionMenu
          pokerSessionId={pokerSessionId}
          {...menuProps}
        />
      )}
      {...other}
    />
  );
};

export {
  PokerSessionMenuWithBtn,
};
