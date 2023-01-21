import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { SettingsDangerZone } from '@components/domains/space/SpaceSettings/SettingsDangerZone';
import { SettingsMeta } from '@components/domains/space/SpaceSettings/SettingsMeta';

import { PageTitle } from '@components/uiKit/PageTitle';

import { TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

const SpaceSettings = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const currSpace = useSelector(spacesSelectors.getCurrSpace);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!currSpace || !canModerate || detect.isChpokifyIOSApp) {
    return null;
  }

  return (
    <>
      <PageTitle>
        {t('spaceSettingsPage.titleSettings')}
      </PageTitle>
      {
        canModerate && (
          <>
            <SettingsMeta
              mb={8}
            />
          </>
        )
      }

      <SettingsDangerZone />
    </>
  );
};

export {
  SpaceSettings,
};
