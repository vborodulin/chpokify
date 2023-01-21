import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconAdd } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TSpaceCreateTeamBtnProps = Partial<TButtonProps> & {
  onTeamCreate?: () => void;
};

const SpaceCreateTeamBtn = (props: TSpaceCreateTeamBtnProps): React.ReactElement | null => {
  const {
    onTeamCreate = () => {},
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const cantModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleCreateTeam = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_CREATE, {
      onSuccess: onTeamCreate,
    }));
  };

  if (!cantModerate) {
    return null;
  }

  return (
    <Button
      data-test-id={DATA_TEST_ID.TEAM_CREATE_BTN}
      data-tut-space={SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_BTN}
      StartIcon={IconAdd}
      variant="primary-outline"
      onClick={handleCreateTeam}
      {...other}
    >
      {t('spaceButtons.createTeam')}
    </Button>
  );
};

export {
  SpaceCreateTeamBtn,
};
