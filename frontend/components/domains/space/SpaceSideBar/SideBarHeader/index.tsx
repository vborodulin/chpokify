import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { Logo, TLogoProps } from '@components/domains/shared/Logo';
import { SideBarItem, SideBarItemAdornment } from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconMenu } from '@components/uiKit/Icons';

const StyledLogo = styled(Logo)<TLogoProps>`
  display: none;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    display: inline-flex;
  }
`;

export type TSideBarHeaderProps = {};

const SideBarHeader = (props: TSideBarHeaderProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const space = useSelector(spacesSelectors.getCurrSpace);

  if (!space) {
    return null;
  }

  return (
    <Link
      href={routing.getSpaceUrlTemplate()}
      // @ts-ignore
      as={routing.getSpaceUrl(space._id)}
    >
      <SideBarItem
        canInteract
        {...other}
      >
        <SideBarItemAdornment>
          <IconMenu
            fill="font.primary"
          />
        </SideBarItemAdornment>
        <StyledLogo
          mr={4}
        />
      </SideBarItem>
    </Link>
  );
};

export {
  SideBarHeader,
};
