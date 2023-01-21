import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { persistSelectors } from '@Redux/domains/persist/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { ONBOARDING_TYPE } from '@components/domains/marketing/types';
import { useCanMakeOnboarding } from '@components/domains/space/onboarding/hooks';
import { SideBarItem, SideBarItemAdornment, SideBarItemText } from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconTour } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

export type TSideBarTutorialProps = {};

const SideBarTutorial = (props: TSideBarTutorialProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const canMakeOnboarding = useCanMakeOnboarding();

  const isSideBarUncollapsed = useSelector(persistSelectors.getIsSideBarUncollapsed);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  const isOpenSidebar = isSideBarOpen || isSideBarUncollapsed;

  const handleClick = async () => {
    await router.push(
      routing.getSpaceUrlTemplate(),
      routing.getSpaceUrl(currSpaceId)
    );

    dispatch(uiActions.onboardingSet({
      type: ONBOARDING_TYPE.SPACE,
    }));
  };

  if (!canMakeOnboarding || detect.isChpokifyIOSApp) {
    return null;
  }

  return (
    <SideBarItem
      onClick={handleClick}
      {...other}
    >
      <SideBarItemAdornment>
        <IconTour
          fill="font.normal"
        />
      </SideBarItemAdornment>

      {
        isOpenSidebar
          ? (
            <SideBarItemText
              opacity={1}
            >
              {t('sideBarTutorial.title')}
            </SideBarItemText>
          ) : null
      }

    </SideBarItem>
  );
};

export {
  SideBarTutorial,
};
