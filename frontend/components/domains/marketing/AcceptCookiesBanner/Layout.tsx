import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { CLASS_TEST } from '@components/domains/core/types';

import { Button } from '@components/uiKit/Button';
import { IconCookie } from '@components/uiKit/Icons';
import { LinkComponent } from '@components/uiKit/Link';
import { Surface, TSurfaceProps } from '@components/uiKit/Surface';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const Root = styled(Surface)<TSurfaceProps>`
align-items: center;
background-color: ${({ theme }) => theme.colors.base.a_20};
display: flex;
flex-flow: row nowrap;
justify-content: center;
padding: ${({ theme }) => theme.space[3]};
`;

export type TAcceptCookiesBannerLayoutProps = Partial<TSurfaceProps> & {
  needShow: boolean;
  onSubmit: () => void;
}

const Layout = (props: TAcceptCookiesBannerLayoutProps): React.ReactElement | null => {
  const {
    needShow,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!needShow) {
    return null;
  }

  return (
    <Root
      variant="popover"
    >
      <IconCookie
        opacity={0.6}
        mr={2}
      />

      <Text
        fontSize={2}
        mr={4}
      >
        {t('acceptCookies.descriptionPartOne')}

        {' '}
        <LinkComponent
          href={routing.getPrivacyPolicyUrl()}
          fontSize={2}
        >
          {t('acceptCookies.descriptionPartTwoLink')}
        </LinkComponent>

        {t('acceptCookies.descriptionPartThree')}
      </Text>

      <Button
        variant="primary"
        onClick={onSubmit}
        className={CLASS_TEST.COOKIES_BANNER_CLOSE_BTN}
      >
        {t('acceptCookies.submitBtn')}
      </Button>
    </Root>
  );
};

export {
  Layout,
};
