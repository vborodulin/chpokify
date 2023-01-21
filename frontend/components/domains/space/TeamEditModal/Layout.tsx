import { TEntityID, TUserWithParticipant } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';
import { TeamEditForm, TFormData, TFormRefs } from '@components/domains/space/TeamEditForm';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { IconDelete } from '@components/uiKit/Icons';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TEditTeamModalLayoutProps = {
  canModerate: boolean;
  spaceUsersWithParticipants: TUserWithParticipant[],
  teamParticipantsIds: TEntityID[],
  formRefs: TFormRefs,
  defaultValues: Record<keyof TFormData, string | undefined>
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSetValue: (name: string, value: boolean) => void;
  onRemove: () => void;
  onCancel: () => void;
  onUpdate: () => void;
}

const Layout = (props: TEditTeamModalLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    spaceUsersWithParticipants,
    teamParticipantsIds,
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    hasChanges,
    isLoading,
    onSetValue,
    onRemove,
    onCancel,
    onUpdate,
  } = props;
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      data-test-id={DATA_TEST_ID.TEAM_EDIT_MODAL}
    >
      <PaperHeader>
        {t('editTeamModal.title')}
      </PaperHeader>

      <PaperContent
        forwardedAs="form"
        onSubmit={onUpdate}
      >
        <TeamEditForm
          onSetValue={onSetValue}
          formRefs={formRefs}
          defaultValues={defaultValues}
          spaceUsersWithParticipants={spaceUsersWithParticipants}
          teamParticipantsIds={teamParticipantsIds}
          canModerate={canModerate}
          errGlobalMsg={errGlobalMsg}
          errors={errors}
          hasChanges={hasChanges}
          isLoading={isLoading}
        />
      </PaperContent>

      <PaperFooter>
        <Divider
          mb={6}
        />
        <Grid
          justifyContent={!canModerate ? 'flex-end' : 'space-between'}
          gridGap={4}
          gridAutoFlow="column"
        >
          <Button
            StartIcon={IconDelete}
            onClick={onRemove}
          />
          <Flex
            gap={4}
          >
            <Button
              onClick={onCancel}
            >
              {t('editTeamModal.cancelBtn')}
            </Button>

            <Button
              variant="primary"
              type="submit"
              onClick={onUpdate}
              disabled={isLoading || !hasChanges}
            >
              {t('editTeamModal.saveBtn')}
            </Button>

          </Flex>
        </Grid>
        <PaperActions />
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
