import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from '@components/uiKit/Button';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TSpaceDonationProps = Partial<TPaperProps>;

const Root = styled(Paper)<TPaperProps>`
background-position: right;
background-repeat: no-repeat;
background-size: contain;
`;

const SpaceDonation = (props: TSpaceDonationProps) => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Root
      variant="card"
      {...other}
    >
      <PaperHeader>
        <Text
          as="h3"
          fontSize={6}
          fontWeight={1}
        >
          {t('spaceDonation.titleOne')}
          <br />
          {t('spaceDonation.titleTwo')}
        </Text>
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
          display={['none', 'block']}
        >
          {t('spaceDonation.description')}
        </Text>
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          <Link
            href={routing.getSponsorshipUrl()}
          >
            <Button
              data-test-id="make-piglet-hapy-btn"
              variant="primary-outline"
              css={css`background-color: ${({ theme }) => theme.colors.base.normal}`}
            >
              {t('spaceDonation.actionBtn')}
            </Button>
          </Link>
        </PaperActions>
      </PaperFooter>
    </Root>
  );
};

export {
  SpaceDonation,
};
