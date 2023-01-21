import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { RetroSessionPeopleMenu } from '@components/domains/retro/RetroSession/RetroSessionPeopleMenu';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconGroupOfUsers } from '@components/uiKit/Icons';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';

import { detect } from '@lib/detect';

type TRetroSessionPeoplesBtnProps = Partial<TButtonProps> & {
  canModerate:boolean
};

type TButtonClick = (event: React.MouseEvent) => void;

const RetroSessionPeopleBtn = (props: TRetroSessionPeoplesBtnProps): React.ReactElement | null => {
  const {
    canModerate,
    ...other
  } = props;

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`retroSessionPeopleBtn-${shortid()}`);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const countPeopleInSession = useSelector(
    retroSessionRepoSelectors.getCountPeopleByRetroSessionId
  )(currRetroSessionId);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleClickFromMobile = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_PEOPLE));
  };

  const renderBtn = (onClick: TButtonClick) => (
    <Button
      StartIcon={IconGroupOfUsers}
      onClick={onClick}
      {...other}
    >
      {countPeopleInSession}
    </Button>
  );

  if (!canModerate) {
    return null;
  }

  if (detect.getIsMobile()) {
    return (
      <Box>
        {
          renderBtn(handleClickFromMobile)
        }
      </Box>
    );
  }

  return (
    <Box
      ref={setTargetElement}
    >
      {
        renderBtn(handleClick)
      }
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.CLICK}
        options={{
          ...popperTooltipOptions,
          placement: 'bottom',
        }}
      >
        <RetroSessionPeopleMenu />
      </Popper>
    </Box>
  );
};

export {
  RetroSessionPeopleBtn,
};
