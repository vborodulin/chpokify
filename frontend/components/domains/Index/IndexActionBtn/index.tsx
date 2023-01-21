import { routing } from '@chpokify/routing';
import Link from 'next/link';
import React from 'react';
import { css } from 'styled-components';

import { Button, TButtonProps } from '@components/uiKit/Button';

export type TIndexActionBtnProps = Partial<TButtonProps> & {
  isPromo?: boolean;
};

const IndexActionBtn = (props: TIndexActionBtnProps): React.ReactElement | null => {
  const {
    isPromo,
    ...other
  } = props;

  return (
    <Link
      href={routing.getSignUpUrl()}
    >
      <Button
        css={
          !isPromo && css`background-color: ${({ theme }) => theme.colors.baseInvert.normal}`
        }
        {...other}
      />
    </Link>
  );
};

export {
  IndexActionBtn,
};
