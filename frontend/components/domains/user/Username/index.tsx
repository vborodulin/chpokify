import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { GuestBadge } from '@components/domains/user/GuestBadge';
import { YouBadge } from '@components/domains/user/YouBadge';

import { Box } from '@components/uiKit/Box';
import { IconCrown } from '@components/uiKit/Icons';
import { OnlineDot } from '@components/uiKit/OnlineDot';
import { Text, TTextProps } from '@components/uiKit/Text';

import { stylesMixins } from '@styles';

export type TUsernameProps = Omit<TTextProps, 'children'> & {
  username: string;
  isSpaceModerator?: boolean;
  hideYourBadge?: boolean;
  isGuest?: boolean;
};

const Root = styled(Text)<TTextProps>`
${stylesMixins.textEllipsis()};

align-items: center;
font-size: ${({ theme }) => theme.fontSizes[2]};
line-height: 24px;
`;

const Username = React.forwardRef<any, TUsernameProps>((props, ref) => {
  const {
    username,
    isSpaceModerator,
    isOnline,
    hideYourBadge,
    isGuest,
    ...other
  } = props;

  const currUsername = useSelector(authSelectors.getCurrUsername);

  return (
    <>
      <Box
        display="flex"
        flexShrink="0"
        alignItems="center"
      >
        {
          isOnline && (
            <OnlineDot
              mr={1}
            />
          )
        }
        {isSpaceModerator && (
          <IconCrown
            mr={1}
          />
        )}
        {
          (!hideYourBadge && username === currUsername) && (
            <YouBadge
              mr={1}
            />
          )
        }
        {
          isGuest && (
            <GuestBadge
              mr={1}
            />
          )
        }
      </Box>
      <Root
        ref={ref}
        display="inline-flex"
        flexGrow={1}
        {...other}
      >
        {username}
      </Root>
    </>
  );
});

export {
  Username,
};
