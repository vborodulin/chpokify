import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconAddUser } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

type TParticipantsFooterProps = Partial<TButtonProps> & {
  onInvite: () => void;
};

const ParticipantsFooter = (props: TParticipantsFooterProps): React.ReactElement | null => {
  const { onInvite, ...other } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <Button
      data-tut-space={SPACE_ONBOARDING_STEP_ID.INVITE_BTN}
      variant="primary-outline"
      StartIcon={IconAddUser}
      onClick={onInvite}
      {...other}
    >
      {t('members.inviteBtn')}
    </Button>
  );
};

export { ParticipantsFooter };
