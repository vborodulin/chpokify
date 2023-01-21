import { STORY_SORT } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { storiesActions } from '@Redux/domains/stories/actions';
import { storiesSelectors } from '@Redux/domains/stories/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconSortAscending, IconSortDescending } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TPokerStoryAddBtnProps = Partial<TIconButtonProps>;

const PokerStorySortBtn = (props: TPokerStoryAddBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`sortStories-${shortid()}`);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const sortTask = useSelector(storiesSelectors.getSort);

  const isSortHigh = sortTask === STORY_SORT.HIGH_SCORE;

  const handleSortStories = async () => {
    if (!pokerSessionId) {
      return;
    }

    const sort = isSortHigh ? STORY_SORT.LOW_SCORE : STORY_SORT.HIGH_SCORE;

    await dispatch(pokerSessionsAsyncActions.storiesSetSort(pokerSessionId, {
      sort,
    }));
    dispatch(storiesActions.setSort(sort));
  };

  const renderTooltip = () => {
    let title = t('pokerSession.sortTasksHighScoreTooltip');

    if (isSortHigh) {
      title = t('pokerSession.sortTasksLowScoreTooltip');
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'top',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {title}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  const renderIcon = () => {
    if (isSortHigh) {
      return (
        <IconSortAscending
          fill="primary.normal"
        />
      );
    }

    return (
      <IconSortDescending
        fill="primary.normal"
      />
    );
  };

  if (!canModerate) {
    return null;
  }

  return (
    <Box
      ref={setTargetElement}
    >
      <IconButton
        variant="contained"
        onClick={handleSortStories}
        isHover
        {...other}
      >
        {renderIcon()}
      </IconButton>
      {renderTooltip()}
    </Box>

  );
};

export {
  PokerStorySortBtn,
};
