import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconEdit } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TRetroSessionEditCardsBtnProps = TButtonProps;

const WIDTH_TOOLTIP = '160';

const RetroSessionEditCardsBtn = (props: TRetroSessionEditCardsBtnProps)
  : React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [targetElement, setTargetElement] = useState<any>();
  const popperIdRef = useRef(`retroSessionCardEditBtn-${shortid()}`);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const canEditCards = useSelector(retroSessionsSelectors.getCanEditCards);

  const renderTitleBtn = () => {
    if (!canEditCards) {
      return t('pages.retro.settingsSidebarEditForm.canEditCards.disabled');
    }

    return t('pages.retro.settingsSidebarEditForm.canEditCards.enabled');
  };

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
      <Tooltip
        width={`${WIDTH_TOOLTIP}px`}
      >
        <TooltipTitle
          fontSize={2}
        >
          {t('pages.retro.settingsSidebarEditForm.canEditCards.tooltip')}
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  const renderIconBtn = () => (
    <IconEdit />
  );

  const handleClick = async () => {
    await dispatch(retroSessionsAsyncActions.update(
      currRetroSessionId, {
        canEditCards: !canEditCards,
      }
    ));
  };

  return (
    <Box
      ref={setTargetElement}
    >
      <Button
        variant="base-shadow"
        isActive={!canEditCards}
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
  RetroSessionEditCardsBtn,
};
