import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TRetroSessionRemoveModalProps = Partial<TModalProps> & {
  retroSessionId: string;
  onClose: () => void;
};

const RetroSessionRemoveModal = (props: TRetroSessionRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    retroSessionId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    retroSessionsActionsTypes.REMOVE_PENDING,
  ]);

  const retroSession = useSelector(retroSessionsSelectors.getById)(retroSessionId);
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const handleRemove = async () => {
    if (!retroSession) {
      return;
    }

    const { payload } = await dispatch(
      retroSessionsAsyncActions.remove(retroSession._id)
    );

    if (!getIsRejectedActionPayload(payload) && onClose) {
      onClose();

      await router.push(
        routing.getRetroUrlTemplate(),
        routing.getRetroUrl(spaceId)
      );
    }
  };

  if (!retroSession) {
    return null;
  }

  return (
    <Modal>
      <PaperHeader
        mb={0}
      >
        {t('pages.retro.removeSessionModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('pages.retro.removeSessionModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('pages.retro.removeSessionModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionRemoveModal,
};
