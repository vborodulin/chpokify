import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { RetroSessionActions } from '@components/domains/retro/RetroSession/RetroSessionHeader/RetroSessionActions';
import {
  RetroSessionDescription,
} from '@components/domains/retro/RetroSession/RetroSessionHeader/RetroSessionDescription';
import { RetroSessionTitle } from '@components/domains/retro/RetroSession/RetroSessionHeader/RetroSessionTitle';
import { RouterBackBtn } from '@components/domains/shared/RouterBackBtn';

import { Box } from '@components/uiKit/Box';
import { Flex, TFlexProps } from '@components/uiKit/Flex';

type TRetroSessionHeaderProps = Partial<TFlexProps>;

const RetroSessionHeader = (props: TRetroSessionHeaderProps): React.ReactElement | null => {
  const { ...other } = props;

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const onClickEditModal = () => {
    if (!canModerate || !currRetroSessionId) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_EDIT, {
      retroSessionId: currRetroSessionId,
    }));
  };

  if (!currRetroSessionId) {
    return null;
  }

  return (
    <Flex
      mb={4}
      alignItems="flex-start"
      gap={3}
      justifyContent="space-between"
      flexWrap="wrap"
      {...other}
    >

      <Flex
        alignItems="flex-start"
        gap={3}
      >
        <RouterBackBtn />

        <Box>
          <RetroSessionTitle
            canModerate={canModerate}
            onClickEditModal={onClickEditModal}
          />
          <RetroSessionDescription />
        </Box>
      </Flex>

      <RetroSessionActions
        canModerate={canModerate}
      />
    </Flex>
  );
};

export {
  RetroSessionHeader,
};
