import { isEqualsId, spaceHelpers } from '@chpokify/helpers';
import {
  TSpace, TStory, TUser,
} from '@chpokify/models-types';
import { TPokerSession } from '@chpokify/models-types/pokerSession';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { spacesActions } from '@Redux/domains/spaces/actions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { storiesActions } from '@Redux/domains/stories/actions';
import { usersActions } from '@Redux/domains/users/actions';
import { useAppDispatch } from '@Redux/hooks';

import { useSocketSubscribe } from '@components/utils/socket/useSocketSubscribe';

const SpaceSocketSubscriber = (): React.ReactElement | null => {
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const dispatch = useAppDispatch();

  useSocketSubscribe(
    currSpaceId ? `space:${currSpaceId.toString()}` : '',
    (data: { space: TSpace }) => {
      const { space } = data;

      const participant = spaceHelpers.getParticipant(
        space,
        currUserId
      );

      if (space.isDeleted || !participant) {
        dispatch(spacesActions.remove(space._id));
        return;
      }

      dispatch(spacesActions.upsert(space));
    }
  );

  useSocketSubscribe(
    currSpaceId ? `storySpace:${currSpaceId.toString()}` : '',
    (data: { story: TStory }) => {
      const { story } = data;
      dispatch(storiesActions.upsert(story));
    }
  );

  useSocketSubscribe(
    currSpaceId ? `userSpace:${currSpaceId.toString()}` : '',
    (data: { user: TUser }) => {
      const { user } = data;

      if (isEqualsId(user._id, currUserId)) {
        return;
      }

      dispatch(usersActions.upsert(user));
    }
  );

  useSocketSubscribe(
    `pokerSession:${currSpaceId.toString()}`, (data: { pokerSession: TPokerSession }) => {
      const { pokerSession } = data;

      if (pokerSession.isDeleted) {
        dispatch(pokerSessionsActions.remove(pokerSession._id));
      } else {
        dispatch(pokerSessionsActions.upsert(pokerSession));
      }
    }
  );

  return null;
};

export {
  SpaceSocketSubscriber,
};
