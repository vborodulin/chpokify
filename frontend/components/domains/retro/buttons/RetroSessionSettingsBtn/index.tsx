import React, { useRef } from 'react';
import shortid from 'shortid';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { RetroSessionSettingsMenu } from '@components/domains/retro/RetroSession/RetroSessionSettingsMenu';
import { IconBtnWithMenu, TIconBtnWithMenuProps } from '@components/domains/shared/IconBtnWithMenu';

import { IconButton } from '@components/uiKit/IconButton';
import { IconMoreHorizontal } from '@components/uiKit/Icons';

import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';

import { detect } from '@lib/detect';

type TRetroSessionSettingsBtnProps = Partial<TIconBtnWithMenuProps> & {};

const RetroSessionSettingsBtn = (props: TRetroSessionSettingsBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const menuPopperIdRef = useRef<string>(`retroSessionSettings-${shortid()}`);

  const dispatch = useAppDispatch();

  const popperProps: TIconBtnWithMenuProps['popperProps'] = {
    options: {
      ...popperTooltipOptions,
      placement: 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  };

  const handleClick = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_SETTINGS));
  };

  const renderIcon = () => (
    <IconMoreHorizontal
      fill="primary.normal"
    />
  );

  if (detect.getIsMobile()) {
    return (
      <IconButton
        isHover
        onClick={handleClick}
        {...other}
      >
        {
          renderIcon()
        }
      </IconButton>
    );
  }

  return (
    <IconBtnWithMenu
      iconStyledType="horizontally"
      popperId={menuPopperIdRef.current}
      icon={renderIcon()}
      menu={(
        <RetroSessionSettingsMenu />
      )}
      popperProps={popperProps}
      {...other}
    />
  );
};

export {
  RetroSessionSettingsBtn,
};
