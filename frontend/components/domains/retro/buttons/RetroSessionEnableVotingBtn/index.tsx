import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconThumbs } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TRetroSessionEnableVotingBtnProps = TButtonProps;

const RetroSessionEnableVotingBtn = (props: TRetroSessionEnableVotingBtnProps)
  : React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`retroSessionEnableVotingBtn-${shortid()}`);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const isDisableVotingCards = useSelector(retroSessionsSelectors.getIsDisableVotingCards);

  const renderTooltip = () => (
    <Popper
      id={popperIdRef.current}
      targetElement={targetElement}
      mode={POPPER_MODE.HOVER}
      options={{
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
      }}
    >
      <Tooltip>
        <TooltipTitle
          fontSize={2}
        >
          {t('pages.retro.settingsSidebarEditForm.isEnableVoting.tooltip')}
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  const renderTitleBtn = () => {
    if (isDisableVotingCards) {
      return t('pages.retro.settingsSidebarEditForm.isEnableVoting.disabled');
    }

    return t('pages.retro.settingsSidebarEditForm.isEnableVoting.enabled');
  };

  const renderIconBtn = () => (
    <IconThumbs
      mr={[0, 2]}
    />
  );

  const handleClick = async () => {
    await dispatch(retroSessionsAsyncActions.update(
      currRetroSessionId, {
        isDisableVotingCards: !isDisableVotingCards,
      }
    ));
  };

  return (
    <Box
      ref={setTargetElement}
    >
      <Button
        variant="base-shadow"
        isActive={isDisableVotingCards}
        startIcon={renderIconBtn()}
        onClick={handleClick}
        isMobileReady
        {...other}
      >
        {
        renderTitleBtn()
      }
      </Button>
      {
        renderTooltip()
      }
    </Box>
  );
};

export {
  RetroSessionEnableVotingBtn,
};
