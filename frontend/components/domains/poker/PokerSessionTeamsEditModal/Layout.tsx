import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { CLASS_TEST, DATA_TEST_ID } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';
import { SpaceCreateTeamBtn } from '@components/domains/space/buttons/SpaceCreateTeamBtn';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import {
  FORM_FIELDS,
  PokerSessionTeamEditForm,
  TFormData,
  TPokerSessionTeamEditFormProps,
} from '../PokerSessionTeamsEditForm';

export type TLayoutProps = Omit<TPokerSessionTeamEditFormProps, 'formId'> & {
  hasChanges: boolean;
  onCancel: () => void;
  onOpenModalTeamsEdit: () => void;
  isSpaceOnboardingOpen?: boolean;
  isCreateSession: boolean,
};

const FORM_ID = 'PokerSessionTeamsCreate';

const Layout = (props: TLayoutProps) => {
  const {
    formRefs,
    teams,
    isLoading,
    hasChanges,
    errors,
    errGlobalMsg,
    defaultValue,
    isSpaceOnboardingOpen,
    onSubmit,
    onOpenModalTeamsEdit,
    onCancel,
    isCreateSession,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const onHandleOpenModalTeamsEdit = () => {
    onOpenModalTeamsEdit();
  };

  return (
    <Modal
      data-test-id={DATA_TEST_ID.POKER_SESSION_TEAMS_EDIT_MODAL}
      data-tut-space={SPACE_ONBOARDING_STEP_ID.POKER_SESSION_TEAMS_EDIT_MODAL}
      {...other}
    >
      <PaperHeader>
        {t('pokerSessionChooseTeams.title')}
      </PaperHeader>

      <PaperContent>
        <PokerSessionTeamEditForm
          hasTeamHint
          formRefs={formRefs}
          formId={FORM_ID}
          onSubmit={onSubmit}
          isLoading={isLoading}
          teams={teams}
          errors={errors}
          errGlobalMsg={errGlobalMsg}
          defaultValue={defaultValue}
        />
        <SpaceCreateTeamBtn
          mt={6}
          onTeamCreate={onHandleOpenModalTeamsEdit}
        />
      </PaperContent>

      <PaperFooter>
        <Divider
          mb={6}
        />
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('pokerSessionChooseTeams.cancelBtn')}
          </Button>
          <Button
            data-test-id={DATA_TEST_ID.POKER_SESSION_TEAMS_EDIT_MODAL_SUBMIT_BTN}
            type="submit"
            form={FORM_ID}
            variant="primary"
            disabled={isLoading || !hasChanges}
            className={classnames({
              [CLASS_TEST.SPACE_ONBOARDING_LAST_STEP_BTN]: isSpaceOnboardingOpen,
            })}
          >
            {!isCreateSession
              ? t('pokerSessionChooseTeams.doneBtn')
              : t('pokerSessionChooseTeams.submitBtn')}

          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
  FORM_FIELDS,
};

export type {
  TFormData,
};
