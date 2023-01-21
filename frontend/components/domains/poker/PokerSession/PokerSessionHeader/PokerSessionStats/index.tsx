import { TEntityID } from '@chpokify/models-types';
import React from 'react';

import { PokerSessionTimer } from '@components/domains/poker/PokerSession/PokerSessionHeader/PokerSessionTimer';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TPokerSessionStatsProps = Partial<TFlexProps> & {
  pokerSessionId: TEntityID;
};

const PokerSessionStats = (props: TPokerSessionStatsProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    ...other
  } = props;

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-end"
      {...other}
    >
      <PokerSessionTimer
        pokerSessionId={pokerSessionId}
      />
    </Flex>
  );
};

export {
  PokerSessionStats,
};
