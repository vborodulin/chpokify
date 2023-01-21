import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { Divider } from '@components/uiKit/Divider';
import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type THeaderContainerProps = Partial<TFlexProps>

export const HEADER_HEIGHT = '55px';

const HeaderContainer = (props: THeaderContainerProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      bg="base.normal"
      height={HEADER_HEIGHT}
      alignItems="center"
      zIndex={1}
      {...other}
    >
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        pl={[2, null, !isLoggedIn ? 6 : 2]}
        pr={[3, null, 6]}
        mx="auto"
      >
        {children}
      </Flex>
      <Divider
        position="absolute"
        bottom="0"
      />
    </Flex>
  );
};

export {
  HeaderContainer,
};
