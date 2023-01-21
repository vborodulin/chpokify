import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { persistSelectors } from '@Redux/domains/persist/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';

import { SideBarItem, SideBarItemAdornment, SideBarItemText } from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconSettingsOutline } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

export type TSideBarSettingsProps = {};

const SideBarSettings = (props: TSideBarSettingsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const { pathname } = useRouter();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const isSideBarUncollapsed = useSelector(persistSelectors.getIsSideBarUncollapsed);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const isOpenSidebar = isSideBarOpen || isSideBarUncollapsed;

  if (!canModerate || detect.isChpokifyIOSApp) {
    return null;
  }

  return (
    <Link
      href={routing.getSpaceSettingsTemplate()}
      // @ts-ignore
      as={routing.getSpaceSettingsUrl(currSpaceId)}
    >
      <SideBarItem
        isActive={routingHelpers.match(
          pathname,
          routing.getSpaceSettingsTemplate(),
          true
        )}
        {...other}
      >
        <SideBarItemAdornment>
          <IconSettingsOutline
            fill="font.normal"
          />
        </SideBarItemAdornment>

        {
          isOpenSidebar
            ? (
              <SideBarItemText
                opacity={1}
              >
                {t('sideBarSettings.title')}
              </SideBarItemText>
            ) : null
        }
      </SideBarItem>
    </Link>
  );
};

export {
  SideBarSettings,
};
