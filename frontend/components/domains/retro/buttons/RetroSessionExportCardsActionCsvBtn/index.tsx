import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { retroSessionsOperations } from '@Redux/domains/retroSessions/operations';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { IconButton } from '@components/uiKit/IconButton';
import { IconDownload } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TRetroSessionExportCardsActionCsvBtnProps = TBoxProps & {};

const RetroSessionExportCardsActionCsvBtn = (props: TRetroSessionExportCardsActionCsvBtnProps)
  : React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [targetElement, setTargetElement] = useState<any>();
  const popperIdRef = useRef(`retroSessionExportsCardsActionsCSV-${shortid()}`);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleClick = async () => {
    if (!canModerate) {
      return;
    }

    await dispatch(retroSessionsOperations.exportsCardsActionCSV(
      currRetroSessionId,
      t('fileDownloaded')
    ));
  };

  const renderTooltip = () => (
    <Popper
      id={popperIdRef.current}
      targetElement={targetElement}
      mode={POPPER_MODE.HOVER}
      options={{
        ...popperTooltipOptions,
        placement: 'left',
      }}
    >
      <Tooltip>
        <TooltipTitle
          fontSize={2}
        >
          {t('pages.retro.settingsSidebarEditForm.exportCardsAction.tooltip')}
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  if (!canModerate) {
    return null;
  }

  return (
    <Box
      ref={setTargetElement}
      {...other}
    >
      <IconButton
        variant="icon"
        onClick={handleClick}
        isHover
      >
        <IconDownload
          fill="font.normal"
        />
      </IconButton>
      {
        renderTooltip()
      }
    </Box>
  );
};

export {
  RetroSessionExportCardsActionCsvBtn,
};
