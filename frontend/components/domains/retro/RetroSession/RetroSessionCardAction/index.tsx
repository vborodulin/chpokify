import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionsCardsRepoSelectors } from '@Redux/domains/retroSessionsCardsRepo/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { TFlexProps } from '@components/uiKit/Flex';

import { Layout } from './Layout';

export type TRetroSessionCardActionProps = Partial<TFlexProps> & {
  index: number;
  cardId: string;
  columnId: string;
};

const RetroSessionCardAction = (props: TRetroSessionCardActionProps): React.ReactElement | null => {
  const {
    index,
    cardId,
    columnId,
    ...other
  } = props;

  const title = useSelector(retroSessionsCardsSelectors.getTitle)(cardId);
  const isMyCard = useSelector(retroSessionsCardsRepoSelectors.getIsMyCard)(cardId);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const canEditCards = useSelector(retroSessionsSelectors.getCanEditCards);
  const canMoveCards = useSelector(retroSessionsSelectors.getCanMoveCards);

  return (
    <Layout
      index={index}
      cardId={cardId}
      columnId={columnId}
      isDragEnabled={canModerate || (canMoveCards && isMyCard)}
      hasMenuBtnItem={canModerate || (canEditCards && isMyCard)}
      title={title}
      hasCompletedItem
      {...other}
    />
  );
};

export {
  RetroSessionCardAction,
};
