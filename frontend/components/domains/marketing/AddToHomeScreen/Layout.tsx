import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { Image } from '@components/uiKit/Image';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TPaperProps> & {
  isShow: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const Root = styled(Paper)<TPaperProps>`
bottom: 0;
left: 0;
position: fixed;
right: 0;
`;

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    isShow,
    onCancel,
    onSubmit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!isShow) {
    return null;
  }

  return (
    <Root
      variant="bottomSlide"
      {...other}
    >
      <PaperContent>
        <Flex
          alignItems="center"
          flexDirection="column"
          maxWidth="310px"
          mx="auto"
        >
          <Image
            src="/images/add-to-home-screen.svg"
            alt="add-to-home-screen"
            width="145px"
            height="110px"
            layout="fixed"
            loading="eager"
            mb={6}
          />

          <Text
            fontSize={6}
            fontWeight={1}
            textAlign="center"
          >
            {t('addToHomeScreen.title')}
          </Text>
        </Flex>
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="center"
        >
          <Button
            variant="default"
            onClick={onCancel}
          >
            {t('addToHomeScreen.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
          >
            {t('addToHomeScreen.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Root>
  );
};

export {
  Layout,
};
