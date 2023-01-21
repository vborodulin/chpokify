import { TEntityID } from '@chpokify/models-types';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { IconBtnWithMenu, TIconBtnWithMenuProps } from '@components/domains/shared/IconBtnWithMenu';

import { RetroSessionMenu } from './RetroSessionMenu';

export type TRetroSessionItemMenuBtnProps = Partial<TIconBtnWithMenuProps> & {
  retroSessionId: TEntityID;
};

const RetroSessionItemMenuBtn = (props: TRetroSessionItemMenuBtnProps): React.ReactElement | null => {
  const {
    retroSessionId,
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`retroSessionItemMenu-${shortid()}`);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <IconBtnWithMenu
      popperId={menuPopperIdRef.current}
      iconStyledType="vertical"
      menu={(
        <RetroSessionMenu
          retroSessionId={retroSessionId}
        />
      )}
      {...other}
    />
  );
};

export {
  RetroSessionItemMenuBtn,
};
