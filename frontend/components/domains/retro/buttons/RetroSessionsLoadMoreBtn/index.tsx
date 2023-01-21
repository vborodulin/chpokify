import { isEqualsId } from '@chpokify/helpers';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsOperations } from '@Redux/domains/retroSessions/operations';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';

import { TRANS } from '@components/utils/types';

type TRetroSessionsLoadMoreBtnProps = Partial<TButtonProps>;

const RetroSessionsLoadMoreBtn = (props: TRetroSessionsLoadMoreBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const countAllRetroSessions = useSelector(retroSessionsSelectors.getCountAllEntities);
  const countRetroSessions = useSelector(retroSessionsSelectors.getCountEntities);

  const diffViewSession = (!countAllRetroSessions || isEqualsId(countAllRetroSessions, countRetroSessions))
    ? 0
    : countAllRetroSessions - countRetroSessions;

  const handleClick = async () => {
    await dispatch(retroSessionsOperations.getInitialData(currSpaceId));
  };

  if (!diffViewSession) {
    return null;
  }

  return (
    <Button
      variant="shadow"
      onClick={handleClick}
      {...other}
    >
      +
      {diffViewSession}
      {' '}
      {t('pages.retro.sessionsList.loadMoreBtn')}
    </Button>
  );
};

export {
  RetroSessionsLoadMoreBtn,
};
