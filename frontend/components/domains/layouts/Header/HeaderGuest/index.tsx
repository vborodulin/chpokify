import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import shortid from 'shortid';
import { css } from 'styled-components';

import { HeaderContainer, THeaderContainerProps } from '@components/domains/layouts/HeaderContainer';
import { Logo } from '@components/domains/shared/Logo';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { Image } from '@components/uiKit/Image';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { LOCALE, TRANS } from '@components/utils/types';

import { setLocale } from '@lib/locale';

export type THeaderGuestProps = THeaderContainerProps;

const HeaderGuest = (props:THeaderGuestProps): React.ReactElement | null => {
  const {
    replace, pathname, asPath, locale,
  } = useRouter();

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`tooltip-locale-${shortid()}`);

  const { t } = useTranslation(TRANS.MAIN);

  const handleClickLocale = async () => {
    const localeLocal = locale === LOCALE.EN ? LOCALE.RU : LOCALE.EN;
    setLocale(localeLocal);
    await replace(pathname, asPath, { locale: localeLocal });
  };

  const renderTooltipLocale = () => {
    const title = t('userMenu.localeItem');

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'bottom',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {title}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  const renderLocaleBtn = () => {
    let img = '/images/locale-en';

    if (locale === LOCALE.RU) {
      img = '/images/locale-ru';
    }

    return (
      <Box
        as="li"
        mr={2}
        ref={setTargetElement}
        css={css`cursor: pointer;`}
        onClick={handleClickLocale}
      >
        <Image
          src={`${img}.jpg`}
          alt="locale"
          width="24px"
          height="24px"
          layout="intrinsic"
        />
        {renderTooltipLocale()}
      </Box>
    );
  };

  return (
    <HeaderContainer
      {...props}
    >
      <Logo
        mr={4}
      />

      <Flex
        as="ul"
        alignItems="center"
      >
        {renderLocaleBtn()}

        <Box
          as="li"
          mr={2}
          display={[
            'none',
            'inline-flex',
          ]}
        >
          <Button
            variant="shadow"
            as="a"
            href={routing.getBlogUrl()}
            target="_blank"
          >
            {t('header.blog')}
          </Button>
        </Box>

        <Box
          as="li"
          mr={2}
        >
          <NextLink
            href={routing.getLogInUrl()}
            passHref
          >
            <Button
              variant="shadow"
              isActive={routingHelpers.match(pathname, routing.getLogInUrl(), true)}
              as="a"
              href={routing.getLogInUrl()}
            >
              {t('header.loginBtn')}
            </Button>
          </NextLink>
        </Box>

        <Box
          as="li"
        >
          <NextLink
            href={routing.getSignUpUrl()}
            passHref
          >
            <Button
              variant="primary-outline"
              isActive={routingHelpers.match(pathname, routing.getSignUpUrl(), true)}
              href={routing.getSignUpUrl()}
              as="a"
            >
              {t('header.signUpBtn')}
            </Button>
          </NextLink>
        </Box>
      </Flex>
    </HeaderContainer>
  );
};

export {
  HeaderGuest,
};
