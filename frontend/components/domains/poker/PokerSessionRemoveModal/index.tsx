import { timeHelpers } from '@chpokify/helpers';
import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TPokerSessionRemoveModalProps = {
  pokerSessionId: string;
  onClose: () => void;
};

const PokerSessionRemoveModal = (props: TPokerSessionRemoveModalProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    onClose,
  } = props;

  const dispatch = useAppDispatch();

  const router = useRouter();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    pokerSessionsActionsTypes.REMOVE_PENDING,
  ]);

  const handleRedirect = async () => {
    if (router.asPath === routing.getSpaceUrl(currSpaceId)) {
      return;
    }

    await router.push(
      routing.getSpaceUrlTemplate(),
      routing.getSpaceUrl(currSpaceId)
    );
    await timeHelpers.delay(250);
  };

  const handleRemove = async () => {
    await handleRedirect();

    const { payload } = await dispatch(pokerSessionsAsyncActions.remove(
      pokerSessionId
    ));

    if (getIsRejectedActionPayload(payload)) {
      return;
    }

    onClose();
  };

  return (
    <Layout
      isLoading={isLoading}
      onCancel={onClose}
      onSubmit={handleRemove}
    />
  );
};

export {
  PokerSessionRemoveModal,
};
