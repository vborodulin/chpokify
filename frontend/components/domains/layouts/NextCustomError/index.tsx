import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import { Button } from '@components/uiKit/Button';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconRefresh } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { log } from '@lib/logger';

export type TNextCustomErrorProps = Partial<TFlexProps> & {
  statusCode?: number;
  err?: Error | null;
};

const NextCustomError = (props: TNextCustomErrorProps): React.ReactElement | null => {
  const {
    statusCode = 500,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const reloadPage = () => {
    location.reload();
  };

  useEffect(() => {
    log.warn('Error component');
  }, []);

  return (
    <ContentCenter>
      <Flex
        flexDirection="column"
        alignItems="center"
        {...other}
      >
        <Text
          fontSize={11}
          fontWeight={1}
          mb={2}
        >
          {statusCode}
        </Text>

        <Text
          fontSize={3}
          mb={1}
        >
          {t('serviceError.title')}
        </Text>

        <Text
          fontSize={3}
          mb={4}
        >
          {t('serviceError.description')}
        </Text>

        <Button
          variant="primary"
          StartIcon={IconRefresh}
          onClick={reloadPage}
        >
          {t('serviceError.reloadBtn')}
        </Button>
      </Flex>
    </ContentCenter>
  );
};

export {
  NextCustomError,
};
