import { TEntityID, TUserWithParticipant } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Username } from '@components/domains/user/Username';

import { Box } from '@components/uiKit/Box';
import { Checkbox } from '@components/uiKit/CheckBox';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { FormControl } from '@components/uiKit/FormControl';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Grid } from '@components/uiKit/Grid';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  name: string;
  participantsIds: string[];
}

export const FORM_FIELDS: (keyof TFormData)[] = [
  'name',
];

export type TFormRefs = Record<keyof TFormData, React.Ref<any>>;

export type TTeamEditFormProps = {
  canModerate: boolean;
  spaceUsersWithParticipants: TUserWithParticipant[],
  teamParticipantsIds: TEntityID[],
  formRefs: TFormRefs,
  defaultValues: Record<keyof TFormData, string | undefined>
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  autoFocusFieldName?: boolean;
  onSetValue: (name: string, value: boolean) => void;
};

const TeamEditForm = (props: TTeamEditFormProps): React.ReactElement | null => {
  const {
    canModerate,
    spaceUsersWithParticipants,
    teamParticipantsIds,
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    isLoading,
    autoFocusFieldName,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderParticipants = () => {
    if (!spaceUsersWithParticipants.length) {
      return (
        <ContentEmpty>
          {t('editTeamModal.emptyUsers')}
        </ContentEmpty>
      );
    }

    return (
      <Grid
        gridTemplateColumns={['1fr', '1fr 1fr']}
      >
        {
          spaceUsersWithParticipants.map((user, index) => (
            <React.Fragment
              key={user._id.toString()}
            >
              <FormControlLabel
                label={(
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Username
                      isGuest={user.isGuest}
                      username={user.username}
                    />
                  </Box>
                )}
                mb={index === (spaceUsersWithParticipants.length - 1) ? 0 : 2}
              >
                <Checkbox
                  inputRef={formRefs.participantsIds}
                  name={`participantsIds[${index}]`}
                  value={user.participant._id.toString()}
                  defaultChecked={
                    !!teamParticipantsIds.find(
                      (participantId) => participantId === user.participant._id
                    )
                  }
                />
              </FormControlLabel>

              <FormHelperText
                variant="negative"
              >
                {errors.participantsIds && errors.participantsIds[index].message}
              </FormHelperText>
            </React.Fragment>
          ))
        }
      </Grid>
    );
  };

  return (
    <fieldset
      disabled={!canModerate || isLoading}
    >
      <FormControl
        errorMessage={errors.name?.message}
      >
        <Input
          inputRef={formRefs.name}
          type="text"
          name="name"
          placeholder={t('editTeamModal.editTeamModal')}
          defaultValue={defaultValues.name}
          autoFocus={!!autoFocusFieldName}
        />
      </FormControl>

      <FormControl
        mt={6}
      >
        <FormLabel>
          Members
        </FormLabel>

        {renderParticipants()}
      </FormControl>

      <FormHelperText
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>
    </fieldset>
  );
};

export {
  TeamEditForm,
};
