import React from 'react';

import { HeaderContainer, THeaderContainerProps } from '@components/domains/layouts/HeaderContainer';
import { Logo } from '@components/domains/shared/Logo';
import { SpaceSideBarMenuBtn } from '@components/domains/space/buttons/SpaceSideBarMenuBtn';
import { SpacesListMenuWithBtn } from '@components/domains/space/SpacesListMenuWithBtn';
import { AvatarWithUserMenu } from '@components/domains/user/AvatarWithUserMenu';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';

export type THeaderLoggedInProps = THeaderContainerProps;

const HeaderLoggedIn = (props: THeaderLoggedInProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <HeaderContainer
      {...other}
    >
      <Flex
        alignItems="center"
      >
        <SpaceSideBarMenuBtn
          mr={[2, 8]}
        />

        <Box
          display={['none', 'block']}
          mr={4}
        >
          <Logo />
        </Box>

        <SpacesListMenuWithBtn
          mr={4}
        />

      </Flex>

      <Flex>

        <AvatarWithUserMenu />

      </Flex>
    </HeaderContainer>
  );
};

export
{
  HeaderLoggedIn,
};
