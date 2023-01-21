import { useTranslation } from 'next-i18next';
import React from 'react';

import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';
import { TeamsContent } from '@components/domains/space/Teams/TeamsContent';
import { TeamsFooter } from '@components/domains/space/Teams/TeamsFooter';
import { TeamsHeader } from '@components/domains/space/Teams/TeamsHeader';

import { Paper } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const Teams = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <Paper
      data-tut-space={SPACE_ONBOARDING_STEP_ID.TEAMS}
      variant="card"
    >
      <PaperHeader>
        <TeamsHeader />
      </PaperHeader>
      <PaperContent>
        <Text
          fontSize={2}
          mb={4}
        >
          {t('teams.description')}
        </Text>
        <TeamsContent />
      </PaperContent>
      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          <TeamsFooter />
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Teams,
};
