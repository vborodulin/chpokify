import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconVisibilityOff, IconVisibilityOn } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TRetroSessionHiddenCardsBtnProps = TButtonProps;

const WIDTH_TOOLTIP = '237';

const RetroSessionHiddenCardsBtn = (props: TRetroSessionHiddenCardsBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [targetElement, setTargetElement] = useState<any>();
  const popperIdRef = useRef(`retroSessionCardHiddenBtn-${shortid()}`);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const isHiddenCards = useSelector(retroSessionsSelectors.getIsHiddenCards);

  const renderTitleBtn = () => {
    if (!isHiddenCards) {
      return t('pages.retro.settingsSidebarEditForm.isHiddenCards.disabled');
    }

    return t('pages.retro.settingsSidebarEditForm.isHiddenCards.enabled');
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
          textAlign="center"
          fontSize={2}
        >
          {
            t('pages.retro.settingsSidebarEditForm.isHiddenCards.tooltip')
          }
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  const renderIconBtn = () => {
    if (isHiddenCards) {
      return (
        <IconVisibilityOn
          mr={[0, 2]}
        />
      );
    }

    return (
      <IconVisibilityOff
        mr={[0, 2]}
      />
    );
  };

  const handleClick = async () => {
    await dispatch(retroSessionsAsyncActions.update(
      currRetroSessionId, {
        isHiddenCards: !isHiddenCards,
      }
    ));
  };

  return (
    <Box
      ref={setTargetElement}
    >
      <Button
        onClick={handleClick}
        startIcon={renderIconBtn()}
        variant="base-shadow"
        isActive={!isHiddenCards}
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
  RetroSessionHiddenCardsBtn,
};
