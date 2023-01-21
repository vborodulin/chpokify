import { TStory } from '@chpokify/models-types';
import { TPokerCardDeckScores } from '@chpokify/models-types/pokerCardDeck';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { StoryHeader } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryHeader';
import { StoryLabels } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryLabels';
import { StoryTeams } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryTeams';

import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TPaperProps> & {
  story?: TStory;
  scores: TPokerCardDeckScores;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    story,
    scores,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderContent = () => {
    if (!story) {
      return (
        <ContentEmpty>
          {t('pokerSession.taskNotSelected')}
        </ContentEmpty>
      );
    }

    return (
      <>
        <StoryHeader
          story={story}
          scores={scores}
          mb={6}
        />

        <StoryTeams
          storyId={story._id}
        />
      </>
    );
  };

  return (
    <Paper
      variant="card"
      {...other}
    >
      <PaperContent>
        <StoryLabels />
        {renderContent()}
      </PaperContent>
    </Paper>
  );
};

export {
  Layout,
};
