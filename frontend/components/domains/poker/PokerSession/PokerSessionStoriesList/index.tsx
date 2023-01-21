import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { PokerStoryAddBtn } from '@components/domains/poker/buttons/PokerStoriesAddBtn';
import { PokerStorySortBtn } from '@components/domains/poker/buttons/PokerStoriesSortBtn';
import { PokerStoriesList } from '@components/domains/poker/PokerStoriesList';

import { Caption } from '@components/uiKit/Caption';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TPokerSessionStoriesListProps = Partial<TPaperProps>;

const Root = styled(Paper)<TPaperProps>`
flex-direction: column;
overflow-y: auto;
`;

const PokerSessionStoriesList = (props: TPokerSessionStoriesListProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Root
      variant="card"
      maxHeight="calc(100vh - 220px)"
      {...other}
    >
      <PaperHeader
        mb={3}
      >
        <Caption>
          {t('pokerSession.tasksLabel')}
        </Caption>
      </PaperHeader>

      <PaperContent>
        <PokerStoriesList
          placement="main"
        />
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="space-between"
        >
          <PokerStoryAddBtn />
          <PokerStorySortBtn />
        </PaperActions>
      </PaperFooter>
    </Root>
  );
};

export {
  PokerSessionStoriesList,
};
