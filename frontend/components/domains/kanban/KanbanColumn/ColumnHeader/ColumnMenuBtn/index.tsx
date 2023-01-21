import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { IconBtnWithMenu } from '@components/domains/shared/IconBtnWithMenu';

import { ColumnMenu, TColumnMenuProps } from './ColumnMenu';

export type TColumnMenuBtnProps = Partial<TColumnMenuProps> & {
  kanbanColumnId: TEntityID
};

const ColumnMenuBtn = (props: TColumnMenuBtnProps): React.ReactElement | null => {
  const {
    kanbanColumnId,
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`columnMenu-${shortid()}`);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <IconBtnWithMenu
      popperId={menuPopperIdRef.current}
      menu={(
        <ColumnMenu
          canModerate={canModerate}
          kanbanColumnId={kanbanColumnId}
        />
        )}
      {...other}
    />
  );
};

export {
  ColumnMenuBtn,
};
