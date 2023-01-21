import { TPokerSession } from '@chpokify/models-types/pokerSession';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';

import { SessionListItem } from '@components/domains/poker/PokerSessionsList/SessionListItem';

import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

const StyledSessionListItem = styled(SessionListItem)`
  margin-bottom: ${({ theme }) => theme.space[4]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export type TPokerSessionListLayoutProps = Partial<TPaperProps> & {
  pokerSessions: TPokerSession[];
}

const Layout = (props: TPokerSessionListLayoutProps): React.ReactElement | null => {
  const {
    pokerSessions,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const getIsParticipantSelector = useSelector(pokerSessionsRepoSelectors.getIsUserParticipant);

  const renderItems = () => {
    const items: React.ReactElement[] = [];

    pokerSessions.forEach((session) => {
      const isParticipant = getIsParticipantSelector(session, currUserId);

      if (isParticipant) {
        items.push(
          <StyledSessionListItem
            key={session._id.toString()}
            pokerSession={session}
          />
        );
      }
    });

    return items;
  };

  const renderContent = () => {
    const items = renderItems();

    if (!items.length) {
      return (
        <ContentEmpty>
          {t('pokerSessionsList.emptyDescription')}
        </ContentEmpty>
      );
    }

    return items;
  };

  return (
    <Paper
      variant="card"
      {...other}
    >
      <PaperHeader>
        {t('pokerSessionsList.title')}
      </PaperHeader>

      <PaperContent>
        {renderContent()}
      </PaperContent>
    </Paper>
  );
};

export {
  Layout,
};
