import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { Divider } from '@components/uiKit/Divider';
import { Paper, TPaperProps } from '@components/uiKit/Paper';

import { StoresListItem } from '../StoriesListItem';

export type TStoriesListContentProps = Partial<TPaperProps> & {};

const StoriesListContent = (props: TStoriesListContentProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const userName = useSelector(authSelectors.getCurrUsername);
  const storiesIds = useSelector(storiesSelectors.getListIds);

  return (
    <Paper
      variant="card"
      p={0}
      {...other}
    >
      {
        storiesIds.map((storyId) => (
          <React.Fragment
            key={storyId}
          >
            <StoresListItem
              userName={userName}
              storyId={storyId}
            />
            <Divider />
          </React.Fragment>
        ))
      }
    </Paper>
  );
};

export {
  StoriesListContent,
};
