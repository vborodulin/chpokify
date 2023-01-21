import { isEqualsId } from '@chpokify/helpers';
import { TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Checkbox } from '@components/uiKit/CheckBox';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';
import { FormGroup } from '@components/uiKit/FormGroup';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Grid } from '@components/uiKit/Grid';
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
  teams: TTeam[];
  defaultValue: Partial<TFormData>
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  isLoading: boolean;
};

const RetroSessionTeamEditForm = (props: TPokerSessionTeamEditFormProps): React.ReactElement | null => {
  const {
    teams,
    defaultValue,
    formRefs,
    errors,
    errGlobalMsg,
    isLoading,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

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
          {t('pages.retro.retroSessionEditTeamsModal.description')}
        </Text>

        <FormGroup>
          <FormLabel>
            {t('pages.retro.retroSessionEditTeamsModal.teams')}
          </FormLabel>
          <Grid
            gridTemplateColumns="1fr 1fr"
            gridGap={2}
            gridColumnGap={3}
          >
            {
            teams.map((team, index) => (
              <Box
                key={team._id.toString()}
              >
                <FormControlLabel
                  key={team._id.toString()}
                  label={team.name}
                  mb={0}
                  css={css`flex-wrap: wrap;`}
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

                <FormHelperText
                  variant="negative"
                >
                  {errors.teamsIds && errors.teamsIds[index] ? errors.teamsIds[index].message : ''}
                </FormHelperText>
              </Box>
            ))
          }
          </Grid>
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
      as="form"
      {...other}
    >
      {renderContent()}
    </Box>
  );
};

export {
  RetroSessionTeamEditForm,
};
