import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { TAppDispatch } from '@Redux/types';

import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';
import { ParticipantsContent } from '@components/domains/space/Participants/ParticipantsContent';
import { ParticipantsFooter } from '@components/domains/space/Participants/ParticipantsFooter';
import { ParticipantsHeader } from '@components/domains/space/Participants/ParticipantsHeader';

import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

type TParticipantsProps = Partial<TPaperProps>;

const Participants = (props: TParticipantsProps): React.ReactElement | null => {
  const { ...other } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const handleInvite = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.PARTICIPANT_INVITE));
  };

  const handleEdit = (userId: TEntityID, participantId: TEntityID) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.USER_EDIT, {
      participantId,
      userId,
    }));
  };

  return (
    <Paper
      variant="card"
      data-tut-space={SPACE_ONBOARDING_STEP_ID.PARTICIPANTS}
      {...other}
    >
      <PaperHeader>
        <ParticipantsHeader />
      </PaperHeader>
      <PaperContent>
        <ParticipantsContent
          onEdit={handleEdit}
        />
      </PaperContent>
      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          <ParticipantsFooter
            onInvite={handleInvite}
          />
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Participants,
};
