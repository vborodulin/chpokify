import {
  TRetroCard, TRetroRelations, TRetroSession, TRetroTemplate,
} from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { retroSessionsCardsAction } from '@Redux/domains/retroSessionsCards/actions';
import { retroSessionsRelationsActions } from '@Redux/domains/retroSessionsRelations/actions';
import { retroTemplatesActions } from '@Redux/domains/retroTemplates/actions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { useSocketSubscribe } from '@components/utils/socket/useSocketSubscribe';

const RetroSessionSubscriber = (): React.ReactElement | null => {
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const dispatch = useAppDispatch();

  useSocketSubscribe(
    `retroSession:${spaceId.toString()}`, (data: { retroSession: TRetroSession }) => {
      const { retroSession } = data;

      if (retroSession.isDeleted) {
        dispatch(retroSessionsActions.remove(retroSession._id));
      } else {
        dispatch(retroSessionsActions.upsert(retroSession));
      }
    }
  );

  useSocketSubscribe(
    `retroSessionRelations:${spaceId.toString()}`, (data: { retroSessionRelations: TRetroRelations }) => {
      const { retroSessionRelations } = data;

      if (retroSessionRelations.isDeleted) {
        dispatch(retroSessionsRelationsActions.remove(retroSessionRelations._id));
      } else {
        dispatch(retroSessionsRelationsActions.upsert(retroSessionRelations));
      }
    }
  );

  useSocketSubscribe(
    `retroTemplate:${spaceId.toString()}`,
    (data: { retroTemplate: TRetroTemplate }) => {
      const { retroTemplate } = data;

      dispatch(retroTemplatesActions.upsert(retroTemplate));
    }
  );

  useSocketSubscribe(
    `retroSessionCard:${spaceId.toString()}`, (data: { retroSessionCard: TRetroCard }) => {
      const { retroSessionCard } = data;

      if (retroSessionCard.isDeleted) {
        dispatch(retroSessionsCardsAction.remove(retroSessionCard._id));
      } else {
        dispatch(retroSessionsCardsAction.upsert(retroSessionCard));
      }
    }
  );

  return null;
};

export {
  RetroSessionSubscriber,
};
