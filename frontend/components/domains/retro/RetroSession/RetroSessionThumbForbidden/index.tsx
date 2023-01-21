import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { ContentThumb } from '@components/uiKit/ContentThumb';
import { IconBlock } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

const RetroSessionThumbForbidden = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const router = useRouter();

  const handleBackToSpace = async () => {
    await router.push(
      routing.getIndexUrl()
    );
  };

  return (
    <ContentCenter>
      <ContentThumb
        Icon={IconBlock}
        title={t('pages.retro.retroSession.forbidden.title')}
        description={t('pages.retro.retroSession.forbidden.description')}
        button={(
          <Button
            variant="primary"
            onClick={handleBackToSpace}
          >
            {t('pages.retro.retroSession.forbidden.submitBtn')}
          </Button>
        )}
      />
    </ContentCenter>
  );
};

export {
  RetroSessionThumbForbidden,
};
