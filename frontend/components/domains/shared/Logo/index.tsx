import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { configSelectors } from '@Redux/domains/config/selectors';

import { IconLogo } from '@components/uiKit/Icons';
import { TIconProps } from '@components/uiKit/Icons/Icon';

export type TLogoProps = Partial<TIconProps>;

const StyledIconLogo = styled(IconLogo)`
cursor: pointer;
fill: ${({ theme }) => theme.colors.font.normal};
`;

const Logo = (props: TLogoProps): React.ReactElement | null => {
  const baseUrl = useSelector(configSelectors.getBaseUrl);

  return (
    <Link
      href={baseUrl + routing.getIndexUrl()}
    >
      <a>
        <StyledIconLogo
          width="91px"
          height="18px"
          {...props}
        />
      </a>
    </Link>
  );
};

export {
  Logo,
};
