import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { ContentThumb } from '@components/uiKit/ContentThumb';
import { IconExclamationMarkOutline } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TInviteToSpaceAcceptFailLayoutProps = {
  errMsg: string;
  onCancel: () => void;
};

const Layout = (props: TInviteToSpaceAcceptFailLayoutProps): React.ReactElement | null => {
  const {
    onCancel,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <ContentCenter>
      <ContentThumb
        Icon={IconExclamationMarkOutline}
        title={t('inviteToSpaceAcceptFail.title')}
        description={t('inviteToSpaceAcceptFail.description')}
        button={(
          <Button
            variant="primary"
            onClick={onCancel}
          >
            {t('inviteToSpaceAcceptFail.cancelBtn')}
          </Button>
        )}
      />
    </ContentCenter>
  );
};

export {
  Layout,
};
