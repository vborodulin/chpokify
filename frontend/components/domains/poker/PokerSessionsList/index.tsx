import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { Layout, TPokerSessionListLayoutProps } from './Layout';

export type TSessionsListProps = Partial<TPokerSessionListLayoutProps>

const PokerSessionsList = (props: TSessionsListProps): React.ReactElement | null => {
  const pokerSessions = useSelector(pokerSessionsSelectors.getListSortDeskCreatedAt);

  return (
    <Layout
      pokerSessions={pokerSessions}
      {...props}
    />
  );
};

export {
  PokerSessionsList,
};
