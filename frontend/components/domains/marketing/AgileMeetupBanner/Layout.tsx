import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Flex } from '@components/uiKit/Flex';
import { IconButton } from '@components/uiKit/IconButton';
import { IconCross } from '@components/uiKit/Icons';
import { Image } from '@components/uiKit/Image';
import { Surface, TSurfaceProps } from '@components/uiKit/Surface';
import { Text } from '@components/uiKit/Text';

import { LOCALE, TRANS } from '@components/utils/types';

export type TAcceptCookiesBannerLayoutProps = Partial<TSurfaceProps> & {
  needShow: boolean;
  onClick: () => void;
}

const Root = styled(Surface)<TSurfaceProps>`
align-items: center;
background-color: ${({ theme }) => theme.colors.primary.normal};
cursor:pointer;
display: flex;
justify-content: center;
`;

const HEIGHT_DESKTOP_BANNER = '50px';
const HEIGHT_MOBILE_BANNER = '80px';

const Layout = (props: TAcceptCookiesBannerLayoutProps): React.ReactElement | null => {
  const {
    needShow,
    onClick,
  } = props;

  const router = useRouter();

  const { t } = useTranslation(TRANS.MAIN);

  if (!needShow) {
    return null;
  }

  return (
    <Root
      px={[3, null, 6]}
      height={[HEIGHT_MOBILE_BANNER, HEIGHT_DESKTOP_BANNER]}
      bottom={0}
    >
      <Flex
        alignItems="center"
        flex={1}
        justifyContent={['flex-start', 'center']}
        as="a"
        href={routing.getAgileMeetupUrl()}
        target="_blank"
        flexWrap="wrap"
      >
        <Flex
          alignItems={['flex-start', 'center']}
        >
          <Flex
            position="relative"
            top={['3px', '-2px']}
            width="29px"
            height="26px"
            alignItems="flex-end"
          >
            <Image
              src="/images/calendar.png"
              alt="locale"
              width="100%"
              height="100%"
              layout="intrinsic"
            />
          </Flex>
          <Flex
            flexWrap="wrap"
            alignItems={['flex-end', 'center']}
            ml={[3, 2]}
          >
            <Flex
              alignItems={['flex-end', 'center']}
              mr={[8, 4]}
            >
              <Text
                color="font.invert"
                fontSize={[2, 3]}
                width={['164px', 'auto']}
              >
                {t('agileMeetup.description')}
              </Text>
              {
                router.locale === LOCALE.EN
                && (
                  <Flex
                    ml={1}
                    width="20px"
                    height="22px"
                  >
                    <Image
                      src="/images/meetup-ru-flag.png"
                      alt="meetup-ru-flag"
                      width="100%"
                      height="100%"
                      layout="intrinsic"
                    />
                  </Flex>
                )
              }
            </Flex>
            <Flex
              alignItems="center"
            >
              <Text
                color="font.invert"
                fontSize={[2, 3]}
                mr="1"
                css={{
                  textDecoration: 'underline',
                }}
              >
                {t('agileMeetup.linkBtn')}
              </Text>
              <Text
                color="font.invert"
                fontSize={[2, 3]}
              >
                {' →'}
              </Text>
            </Flex>

          </Flex>

        </Flex>
      </Flex>

      <IconButton
        variant="contained"
        onClick={onClick}
        isHover
        alignSelf={['flex-start', 'auto']}
      >
        <IconCross
          fill="font.invert"
        />
      </IconButton>
    </Root>
  );
};

export {
  Layout,
};
