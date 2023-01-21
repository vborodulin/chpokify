import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { persistSelectors } from '@Redux/domains/persist/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';

import {
  SideBarItem,
  SideBarItemAdornment,
  SideBarItemText,
} from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconCardsOutline } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TSideBarPokerProps = {};

const SideBarPoker = (props: TSideBarPokerProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const { pathname } = useRouter();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const isSideBarUncollapsed = useSelector(persistSelectors.getIsSideBarUncollapsed);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  const isActive = routingHelpers.match(
    pathname,
    routing.getSpaceUrlTemplate(),
    true
  )
    || routingHelpers.match(
      pathname,
      routing.getPokerSessionUrlTemplate(),
      true
    );

  const isOpenSidebar = isSideBarOpen || isSideBarUncollapsed;

  return (
    <Link
      href={routing.getSpaceUrlTemplate()}
      // @ts-ignore
      as={routing.getSpaceUrl(currSpaceId)}
    >
      <SideBarItem
        isActive={isActive}
        {...other}
      >
        <SideBarItemAdornment>
          <IconCardsOutline
            fill="font.normal"
          />
        </SideBarItemAdornment>

        {
          isOpenSidebar
            ? (
              <SideBarItemText
                opacity={1}
              >
                {t('sideBarPoker.title')}
              </SideBarItemText>
            ) : null
        }

      </SideBarItem>
    </Link>
  );
};

export {
  SideBarPoker,
};
