import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { IconBtnWithMenu } from '@components/domains/shared/IconBtnWithMenu';

import { ColumnMenu, TColumnMenuProps } from './ColumnMenu';

export type TColumnMenuBtnProps = Partial<TColumnMenuProps> & {
  retroColumnId: TEntityID;
  targetElement:any
};

const ColumnMenuBtn = (props: TColumnMenuBtnProps): React.ReactElement | null => {
  const {
    retroColumnId,
    targetElement,
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`retroColumnMenu-${shortid()}`);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <IconBtnWithMenu
      popperId={menuPopperIdRef.current}
      iconStyledType="horizontally"
      popperProps={{
        targetElement,
      }}
      menu={(
        <ColumnMenu
          canModerate={canModerate}
          retroColumnId={retroColumnId}
        />
      )}
      {...other}
    />
  );
};

export {
  ColumnMenuBtn,
};
