import { useTranslation } from 'next-i18next';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { ONBOARDING_TYPE } from '@components/domains/marketing/types';
import { useCanMakeOnboarding } from '@components/domains/space/onboarding/hooks';

import { IconTour } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemText } from '@components/uiKit/ListItemText';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TSpaceOnboardingMenuItemProps = {
  onClose: () => void;
}

const SpaceOnboardingMenuItem = (props: TSpaceOnboardingMenuItemProps): React.ReactElement | null => {
  const {
    onClose,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const canMakeOnboarding = useCanMakeOnboarding();

  const handleClick = () => {
    dispatch(uiActions.onboardingSet({
      type: ONBOARDING_TYPE.SPACE,
    }));
  };

  if (!canMakeOnboarding) {
    return null;
  }

  return (
    <MenuItem
      isButton
      onClick={handleClick}
      onClose={onClose}
    >
      <ListItemAdornment>
        <IconTour />
      </ListItemAdornment>

      <ListItemText>
        {t('spaceOnboarding.menuItem')}
      </ListItemText>
    </MenuItem>
  );
};

export {
  SpaceOnboardingMenuItem,
};
