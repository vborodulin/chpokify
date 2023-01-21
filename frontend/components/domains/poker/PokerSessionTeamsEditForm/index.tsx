import { isEqualsId } from '@chpokify/helpers';
import { TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Checkbox } from '@components/uiKit/CheckBox';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';
import { FormGroup } from '@components/uiKit/FormGroup';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  teamsIds: string[];
};

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export const FORM_FIELDS: (keyof TFormData)[] = [
  'teamsIds',
];

export type TPokerSessionTeamEditFormProps = Partial<TBoxProps> & {
  formId: string;
  teams: TTeam[];
  defaultValue: Partial<TFormData>
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  isLoading: boolean;
  onSubmit: () => void;
  hasTeamHint: boolean
};

const PokerSessionTeamEditForm = (props: TPokerSessionTeamEditFormProps): React.ReactElement | null => {
  const {
    formId,
    teams,
    defaultValue,
    formRefs,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
    hasTeamHint,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderTeamHint = (team: TTeam) =>
    `${team.participantsIds.length} members`;

  const renderContent = () => {
    if (!teams.length) {
      return (
        <Text
          fontSize={2}
        >
          {t('pokerSessionEditForm.emptyTeamsDescription')}
        </Text>
      );
    }

    return (
      <fieldset
        disabled={isLoading}
      >
        <Text
          fontSize={2}
          mb={4}
        >
          {t('pokerSessionEditForm.teamsDescription')}
        </Text>

        <FormGroup>
          {
            teams.map((team, index) => (
              <Box
                key={team._id.toString()}
                mb={index === (teams.length - 1) ? 0 : 2}
              >
                <FormControlLabel
                  key={team._id.toString()}
                  label={team.name}
                  mb={0}
                >
                  <Checkbox
                    inputRef={formRefs.teamsIds}
                    name={`teamsIds[${index}]`}
                    value={team._id.toString()}
                    defaultChecked={
                      !!defaultValue.teamsIds && defaultValue.teamsIds.some(
                        (teamId) => isEqualsId(teamId, team._id)
                      )
                    }
                  />
                </FormControlLabel>

                <Text
                  color="font.d_20"
                  fontSize={0}
                  ml={7}
                >
                  {hasTeamHint && renderTeamHint(team)}
                </Text>

                <FormHelperText
                  variant="negative"
                >
                  {errors.teamsIds && errors.teamsIds[index] ? errors.teamsIds[index].message : ''}
                </FormHelperText>
              </Box>
            ))
          }
        </FormGroup>

        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </fieldset>
    );
  };

  return (
    <Box
      id={formId}
      as="form"
      onSubmit={onSubmit}
      {...other}
    >
      {renderContent()}
    </Box>
  );
};

export {
  PokerSessionTeamEditForm,
};
