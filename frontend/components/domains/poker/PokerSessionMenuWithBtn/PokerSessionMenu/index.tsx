import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsOperations } from '@Redux/domains/pokerSessions/operations';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { TRANS } from '@components/utils/types';

import { Layout, TLayoutProps } from './Layout';

export type TPokerSessionMenuProps = Partial<TLayoutProps> & {
  pokerSessionId: TEntityID,
  hasTeamsItem?: boolean;
  hasRemoveItem?: boolean;
  hasFeedbackItem?: boolean;
  onClose?: () => void;
};

const PokerSessionMenu = React.forwardRef<any, TPokerSessionMenuProps>((props, ref) => {
  const {
    pokerSessionId,
    onClose = () => {
    },
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const spaceId = useSelector(pokerSessionsSelectors.getSpaceId)(
    pokerSessionId
  );
  const hasRating = useSelector(pokerSessionsSelectors.hasRating)(pokerSessionId);

  const cantModerate = useSelector(spacesSelectors.getCanModerate)(
    spaceId,
    currUserId
  );

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_EDIT, {
      pokerSessionId,
    }));
  };

  const handleEditTeams = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_TEAMS_EDIT, {
      pokerSessionId,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_REMOVE, {
      pokerSessionId,
    }));
  };

  const handleExportCsv = async () => {
    await dispatch(pokerSessionsOperations.exportCSVAndDownload(
      pokerSessionId,
      t('fileDownloaded')
    ));
  };

  const handleFeedback = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_FEEDBACK, {
      pokerSessionId,
      withBtnRating: false,
    }));
  };

  return (
    <Layout
      ref={ref}
      cantModerate={cantModerate}
      hasRating={hasRating}
      onEdit={handleEdit}
      onEditTeams={handleEditTeams}
      onFeedBack={handleFeedback}
      onRemove={handleRemove}
      onClose={onClose}
      onExport={handleExportCsv}
      {...other}
    />
  );
});

export {
  PokerSessionMenu,
};
