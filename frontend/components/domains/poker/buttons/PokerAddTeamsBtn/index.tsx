import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { PokerTeamsBtn } from '@components/domains/poker/buttons/PokerTeamsBtn';

import { TButtonProps } from '@components/uiKit/Button';
import { IconAdd } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TPokerAddTeamsBtnProps = Partial<TButtonProps> & {
  pokerSessionId: TEntityID;
}

const PokerAddTeamsBtn = (props: TPokerAddTeamsBtnProps) => {
  const {
    pokerSessionId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <PokerTeamsBtn
      variant="primary-outline"
      StartIcon={IconAdd}
      pokerSessionId={pokerSessionId}
      {...other}
    >
      {t('pokerSession.addTeamsBtn')}
    </PokerTeamsBtn>
  );
};

export {
  PokerAddTeamsBtn,
};
