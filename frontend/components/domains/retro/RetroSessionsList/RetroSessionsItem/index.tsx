import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { LOCAL_STORAGE_KEYS } from '@components/domains/core/types';
import { RetroSessionItemActionsBtn } from '@components/domains/retro/buttons/RetroSessionItemActionsBtn';
import { RetroSessionItemMenuBtn } from '@components/domains/retro/buttons/RetroSessionItemMenuBtn';
import { RetroActions } from '@components/domains/retro/RetroSessionsList/RetroSessionsItem/RetroActions';
import { RetroInfo } from '@components/domains/retro/RetroSessionsList/RetroSessionsItem/RetroInfo';
import { RetroStats } from '@components/domains/retro/RetroSessionsList/RetroSessionsItem/RetroStats';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';

import { isomorphicLocalStorage } from '@lib/isomorphicStorage';

const Root = styled(Box)<TBoxProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  min-height: 64px;
  position: relative;


  &:hover {
     background-color: ${({ theme }) => theme.colors.base.a_20};
  }

  &:last-child {
     margin-bottom: 0;
  }
`;

type TRetroSessionsItem = {
  retroSessionId: string;
}

const RetroSessionsItem = (props: TRetroSessionsItem): React.ReactElement | null => {
  const {
    retroSessionId,
  } = props;

  const [isShowActions, setIsShowActions] = useState<boolean>(false);

  const retroSession = useSelector(retroSessionsSelectors.getById)(retroSessionId);

  const keyStorageActions = `${LOCAL_STORAGE_KEYS.SHOW_RETRO_SESSION_ACTIONS}-${retroSessionId}`;

  useEffect(() => {
    const isShow = isomorphicLocalStorage.getItem(keyStorageActions);
    setIsShowActions(!!isShow);
  }, []);

  const handleToggleShowActions = () => {
    setIsShowActions((prevVal) => !prevVal);

    if (isShowActions) {
      isomorphicLocalStorage.removeItem(keyStorageActions);
    } else {
      isomorphicLocalStorage.setItem(keyStorageActions, new Date().toString());
    }
  };

  if (!retroSession) {
    return null;
  }

  return (
    <Root
      p={3}
    >
      <Flex
        alignItems={['start', 'center']}
        justifyContent="space-between"
        cursor="pointer"
        gap={2}
      >
        <Link
          href={routing.getRetroSessionUrlTemplate()}
          // @ts-ignore
          as={routing.getRetroSessionUrl(retroSession?.spaceId, retroSession._id)}
        >
          <Flex
            alignItems={['start', 'center']}
            justifyContent="space-between"
            flex={1}
          >
            <RetroInfo
              retroSessionId={retroSessionId}
            />
            <RetroStats
              retroSessionId={retroSessionId}
            />
          </Flex>
        </Link>

        <Flex>
          <RetroSessionItemActionsBtn
            retroSessionId={retroSessionId}
            isOpen={isShowActions}
            onClick={handleToggleShowActions}
          />
          <RetroSessionItemMenuBtn
            retroSessionId={retroSessionId}
          />
        </Flex>
      </Flex>
      <RetroActions
        retroSessionId={retroSessionId}
        isOpen={isShowActions}
      />
    </Root>

  );
};

export {
  RetroSessionsItem,
};
