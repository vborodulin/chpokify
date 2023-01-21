import { arrayHelpers } from '@chpokify/helpers';
import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActions } from '@Redux/domains/spaces/actions';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { IntegrationsSpacePromoMenuWithBtn } from '@components/domains/integrations/IntegrationsSpacePromoMenuWithBtn';
import { INTEGRATION_TYPE } from '@components/domains/integrations/types';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { IconJira, IconMailOutline } from '@components/uiKit/Icons';
import { IconSlack } from '@components/uiKit/Images';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { Text } from '@components/uiKit/Text';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

import { support } from '@lib/support';

export type TIntegrationsSpacePromoProps = Partial<TPaperProps>;

const Item = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor:pointer;
  display: flex;
  justify-content: space-between;
  min-height: 48px;
  position: relative;

  &:hover {
   background-color: ${({ theme }) => theme.colors.base.a_20};
 }
 `;

const IntegrationsSpacePromo = (props: TIntegrationsSpacePromoProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const integrationsJira = useSelector(authSelectors.getJiraIntegrationsList);

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`integrations-slack-${shortid()}`);

  const handleClickJira = () => {
    Router.push(routing.getJiraConnectUrl());
  };

  const handleOpenSupport = () => {
    support.openEmailModal();
  };

  const hasIntegrations = !arrayHelpers.isEmptyArr(integrationsJira);

  const renderTooltip = () => (
    <Popper
      id={popperIdRef.current}
      targetElement={targetElement}
      mode={POPPER_MODE.HOVER}
      options={{
        ...popperTooltipOptions,
        placement: 'top',
      }}
    >
      <Tooltip>
        <TooltipTitle>
          {t('comingSoon')}
        </TooltipTitle>
      </Tooltip>
    </Popper>
  );

  const renderAvailableItems = () => integrationsJira.map((item) => {
    const { hostname } = new URL(item.baseUrl);
    return (
      <Item
        key={hostname}
        px={3}
        py={1}
        {...other}
      >
        <Flex
          alignItems="center"
          display="flex"
          onClick={handleClickJira}
        >
          <IconJira
            fill="primary.normal"
            mr={2}
          />
          <Text
            fontSize={2}
            fontWeight={1}
          >
            {hostname}
          </Text>
        </Flex>
        <Box>
          <IntegrationsSpacePromoMenuWithBtn
            baseUrl={item.baseUrl}
            typeIntegration={INTEGRATION_TYPE.JIRA}
            menuProps={{
              hasRefreshItem: true,
              hasRemoveItem: true,
            }}
          />
        </Box>
      </Item>
    );
  });

  const renderAvailableIntegrations = () => {
    if (!hasIntegrations) {
      return null;
    }

    return (
      <Box
        flexGrow={1}
        overflowY="auto"
      >
        <Divider
          my={6}
        />
        <Box
          mb={4}
        >
          <Text
            as="h3"
            fontSize={6}
            fontWeight={1}
          >
            {t('integrationsSpacePromo.intergationsList.title')}
          </Text>
        </Box>

        <Flex
          flexDirection="column"
          gap={4}
        >
          {renderAvailableItems()}
        </Flex>
      </Box>
    );
  };

  const renderConnectBtns = () => (
    <>
      <Box
        mb={4}
      >
        <Text
          as="h3"
          fontSize={6}
          fontWeight={1}
        >
          {t('integrationsSpacePromo.title')}
        </Text>
      </Box>
      <Box
        flexGrow={1}
        overflowY="auto"
      >
        <Text
          fontSize={2}
          mb={6}
        >
          {t('integrationsSpacePromo.description')}
        </Text>
        <Flex
          gap={4}
          flexWrap="wrap"
        >
          <Box>
            <Button
              StartIcon={IconJira}
              variant="primary-outline"
              onClick={handleClickJira}
            >
              {t('integrationsSpacePromo.jiraBtn')}
            </Button>
          </Box>
          <Box
            ref={setTargetElement}
          >
            <Button
              StartIcon={IconSlack}
              variant="primary-outline"
              disabled
            >
              {t('integrationsSpacePromo.slackBtn')}
            </Button>
            {renderTooltip()}
          </Box>
        </Flex>

      </Box>
    </>
  );

  if (!canModerate) {
    return null;
  }

  return (
    <Paper
      variant="card"
      {...other}
    >
      {
          renderConnectBtns()
      }
      {
          renderAvailableIntegrations()
      }
      <Divider
        my={6}
      />
      <Box>
        <Button
          StartIcon={IconMailOutline}
          variant="primary-outline"
          onClick={handleOpenSupport}
        >
          {t('integrationsSpacePromo.intergationsList.requestBtn')}
        </Button>
      </Box>
    </Paper>
  );
};

export {
  IntegrationsSpacePromo,
};
