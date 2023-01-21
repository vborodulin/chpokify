import { objectHelpers } from '@chpokify/helpers';
import { TStory } from '@chpokify/models-types';
import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { jiraSelectors } from '@Redux/domains/jira/selectors';
import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { StoriesAddModal } from '@components/domains/stories/StoriesAddModal';

export type TPokerSessionStoriesAddModalProps = {
  onClose: () => void;
}

const PokerSessionStoriesAddModal = (props: TPokerSessionStoriesAddModalProps): React.ReactElement | null => {
  const {
    ...other
  } = props;
  const dispatch = useAppDispatch();
  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const jiraIntegration = useSelector(authSelectors.getJiraIntegrations);
  const jiraFields = useSelector(jiraSelectors.getFields);
  const pokerSession = useSelector(pokerSessionsSelectors.getCurr);

  const hasJiraInPokerSession = !objectHelpers.isEmptyObject(pokerSession?.jira || {});

  const handleAddStoriesToPokerSession = async (data: { stories: TStory[] }) => {
    const res = await dispatch(pokerSessionsAsyncActions.storyAddMany(
      pokerSessionId,
      {
        storiesIds: map(data.stories, '_id'),
      }
    ));

    if (!getIsRejectedActionPayload(res.payload)) {
      if (data.stories.length) {
        dispatch(pokerSessionsActions.storySelect(data.stories[0]._id));
      }
    }
  };

  useEffect(() => {
    if (hasJiraInPokerSession) {
      const baseUrl = pokerSession?.jira?.baseUrl as string;

      if (!jiraFields[baseUrl]) {
        dispatch(jiraAsyncActions.getFields(baseUrl));
      }
    }
  }, [hasJiraInPokerSession]);

  return (
    <StoriesAddModal
      onAfterSubmit={handleAddStoriesToPokerSession}
      hasJiraInPokerSession={hasJiraInPokerSession}
      jiraIntegration={jiraIntegration}
      {...other}
    />
  );
};

export {
  PokerSessionStoriesAddModal,
};
