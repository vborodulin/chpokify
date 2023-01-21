import { TUserWithParticipant } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { CLASS_TEST, DATA_TEST_ID } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';
import { TeamEditForm, TFormData, TFormRefs } from '@components/domains/space/TeamEditForm';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

type TCreatTeamModalLayoutProps = {
  formRefs: TFormRefs;
  spaceUsersWithParticipants: TUserWithParticipant[];
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSetValue: (name:string, value:boolean) => void;
  onCancel: () => void;
  onSubmit: (event: FormEvent) => void;
};

const Layout = (props: TCreatTeamModalLayoutProps): React.ReactElement |null => {
  const {
    spaceUsersWithParticipants,
    formRefs,
    errors,
    errGlobalMsg,
    hasChanges,
    isLoading,
    onSetValue,
    onCancel,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      data-test-id={DATA_TEST_ID.TEAM_CREATE_MODAL}
      data-tut-space={SPACE_ONBOARDING_STEP_ID.TEAM_CREATE_MODAL}
      forwardedAs="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <PaperHeader>
        {t('createTeamModal.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
          mb={4}
        >
          {t('createTeamModal.description')}
        </Text>
        <TeamEditForm
          formRefs={formRefs}
          teamParticipantsIds={[]}
          spaceUsersWithParticipants={spaceUsersWithParticipants}
          defaultValues={{
            name: '',
            participantsIds: undefined,
          }}
          hasChanges={hasChanges}
          errors={errors}
          errGlobalMsg={errGlobalMsg}
          isLoading={isLoading}
          onSetValue={onSetValue}
          canModerate
          autoFocusFieldName
        />
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            data-test-id={DATA_TEST_ID.TEAM_CREATE_MODAL_CANCEL_BTN}
            onClick={onCancel}
          >
            {t('createTeamModal.cancelBtn')}
          </Button>

          <Button
            data-test-id={DATA_TEST_ID.TEAM_CREATE_MODAL_SUBMIT_BTN}
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
            className={CLASS_TEST.TEAM_CREATE_MODAL_SUBMIT_BTN}
          >
            {t('createTeamModal.createBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
