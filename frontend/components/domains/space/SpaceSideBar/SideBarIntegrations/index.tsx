import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { persistSelectors } from '@Redux/domains/persist/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';

import { SideBarItem, SideBarItemAdornment, SideBarItemText } from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconIntegration } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

export type TSideBarIntegrationsProps = {};

const SideBarIntegrations = (props: TSideBarIntegrationsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const { pathname } = useRouter();

  const isSideBarUncollapsed = useSelector(persistSelectors.getIsSideBarUncollapsed);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  const isOpenSidebar = isSideBarOpen || isSideBarUncollapsed;

  if (detect.isChpokifyIOSApp) {
    return null;
  }

  return (
    <Link
      href={routing.getJiraConnectUrl()}
    >
      <SideBarItem
        isActive={routingHelpers.match(
          pathname,
          routing.getJiraConnectUrl(),
          true
        )}
        {...other}
      >
        <SideBarItemAdornment>
          <IconIntegration
            fill="font.normal"
          />
        </SideBarItemAdornment>

        {
          isOpenSidebar
            ? (
              <SideBarItemText
                opacity={1}
              >
                {t('sideBarIntegrations.title')}
              </SideBarItemText>
            ) : null
        }
      </SideBarItem>
    </Link>
  );
};

export {
  SideBarIntegrations,
};
