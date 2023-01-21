import { useTranslation } from 'next-i18next';
import React from 'react';

import { SpaceCreateBtn } from '@components/domains/space/buttons/SpaceCreateBtn';

import { Box } from '@components/uiKit/Box';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TUserWelcomeProps = Partial<TPaperProps>;

const UserWelcome = (props: TUserWelcomeProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Paper
      variant="card"
      maxWidth="460px"
      {...other}
    >
      <PaperHeader>
        {t('userWelcome.title')}
      </PaperHeader>

      <PaperContent>
        <Box
          mb={6}
        >
          <Text
            fontSize={5}
            fontWeight={1}
            mb={3}
          >
            {t('userWelcome.player.title')}
          </Text>

          <Text
            fontSize={2}
            opacity={0.8}
          >
            {t('userWelcome.player.description')}
          </Text>
        </Box>

        <Box>
          <Text
            fontSize={5}
            fontWeight={1}
            mb={3}
          >
            {t('userWelcome.moderator.title')}
          </Text>

          <Text
            fontSize={2}
            opacity={0.8}
          >
            {t('userWelcome.moderator.description')}
          </Text>
        </Box>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <SpaceCreateBtn />
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  UserWelcome,
};
