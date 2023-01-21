import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconLogin } from '@components/uiKit/Icons';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TRetroJoinSessionProps = {
  onClickLoginInGuest: () => void;
  onClickLoginIn: () => void;
};

const RetroSessionJoin = (props: TRetroJoinSessionProps): React.ReactElement | null => {
  const {
    onClickLoginIn,
    onClickLoginInGuest,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Paper
      maxWidth="400px"
      variant="card"
    >
      <PaperContent>
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          <IconLogin
            width="48px"
            height="48px"
            fill="font.normal"
          />
          <Text
            fontSize={6}
            fontWeight={1}
          >
            {t('joinSession.title')}
          </Text>
        </Flex>
      </PaperContent>

      <PaperFooter>
        <Flex
          justifyContent="space-between"
          gap="4"
          flexDirection="column"
        >
          <Button
            variant="primary"
            onClick={onClickLoginIn}
          >
            {t('joinSession.loginOrSignUpBtn')}
          </Button>
          <Button
            variant="primary-outline"
            onClick={onClickLoginInGuest}
          >
            {t('joinSession.joinWithoutRegBtn')}
          </Button>
        </Flex>
      </PaperFooter>
    </Paper>
  );
};

export {
  RetroSessionJoin,
};
