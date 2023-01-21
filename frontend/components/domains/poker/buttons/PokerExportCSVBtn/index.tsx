import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { pokerSessionsOperations } from '@Redux/domains/pokerSessions/operations';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconDownload } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TPokerExportCSVBtnProps = TButtonProps & {
  pokerSessionId: TEntityID;
}

const PokerExportCSVBtn = (props: TPokerExportCSVBtnProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await dispatch(pokerSessionsOperations.exportCSVAndDownload(
      pokerSessionId,
      t('fileDownloaded')
    ));
  };

  return (
    <Button
      StartIcon={IconDownload}
      onClick={handleClick}
      {...other}
    >
      {t('pokerExportCSVBtn.title')}
    </Button>
  );
};

export {
  PokerExportCSVBtn,
};
