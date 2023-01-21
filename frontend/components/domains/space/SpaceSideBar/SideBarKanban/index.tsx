import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { persistSelectors } from '@Redux/domains/persist/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';

import {
  SideBarItem,
  SideBarItemAdornment,
  SideBarItemText,
} from '@components/domains/space/SpaceSideBar/SideBarItem';

import { Badge } from '@components/uiKit/Badge';
import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import {
  IconBoard,
} from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TSideBarIssuesProps = {};

const SideBarKanban = (props: TSideBarIssuesProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`tooltip-beta-${shortid()}`);

  const { t } = useTranslation(TRANS.MAIN);

  const { pathname } = useRouter();
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const isSideBarUncollapsed = useSelector(persistSelectors.getIsSideBarUncollapsed);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  const renderTooltipBeta = () => (
    <Popper
      id={popperIdRef.current}
      targetElement={targetElement}
      mode={POPPER_MODE.HOVER}
      options={{
        ...popperTooltipOptions,
        placement: 'right',
      }}
    >
      <Tooltip>
        <TooltipTitle>
          {t('common.betaTooltip')}
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  const renderBetaBadge = () => (
    <Box
      ref={setTargetElement}
    >
      <Badge
        bg="base.a_30"
        color="font.d_20"
      >
        {t('common.beta')}
      </Badge>
      {renderTooltipBeta()}
    </Box>
  );

  const isActive = routingHelpers.match(
    pathname,
    routing.getKanbanUrlTemplate(),
    true
  )
    || routingHelpers.match(
      pathname,
      routing.getKanbanBoardUrlTemplate(),
      true
    );

  const isOpenSidebar = isSideBarOpen || isSideBarUncollapsed;

  return (
    <Link
      href={routing.getKanbanUrlTemplate()}
      // @ts-ignore
      as={routing.getKanbanUrl(currSpaceId)}
    >
      <SideBarItem
        isActive={isActive}
        {...other}
      >
        <SideBarItemAdornment>
          <IconBoard />
        </SideBarItemAdornment>

        {
          isOpenSidebar
            ? (
              <Flex
                alignItems="center"
              >
                <SideBarItemText
                  opacity={1}
                  mr={2}
                >
                  {t('sideBarKanban.title')}
                </SideBarItemText>
                {renderBetaBadge()}
              </Flex>

            ) : null
        }
      </SideBarItem>
    </Link>
  );
};

export {
  SideBarKanban,
};
