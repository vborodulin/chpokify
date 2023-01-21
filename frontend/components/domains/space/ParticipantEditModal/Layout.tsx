import { SPACE_PARTICIPANT_ROLE, TParticipant, TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { FormEvent, useRef, useState } from 'react';
import shortid from 'shortid';

import { Modal, TModalProps } from '@components/domains/shared/Modal';
import { Username } from '@components/domains/user/Username';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Checkbox } from '@components/uiKit/CheckBox';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { FormControl } from '@components/uiKit/FormControl';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Grid } from '@components/uiKit/Grid';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Switcher } from '@components/uiKit/Switcher';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  username: string;
  email: string;
  teamsIds: string[]
};
export type TFormRefs = Record<keyof TFormData, React.Ref<any>>;

export type TParticipantEditModalLayoutProps = Partial<TModalProps> & {
  participant: TParticipant;
  teams: TTeam[];
  isMe: boolean;
  isGuest: boolean;
  formRefs: TFormRefs;
  defaultValues: Record<keyof TFormData, string | undefined>
  errors: TFormErrors<TFormData>;
  hasChanges: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onRemove: () => void;
  onToggleAdminRole: () => void;
  onChangeTeams: (e: React.ChangeEvent<HTMLInputElement>, teamId: string) => void;
  onSubmit: (event: FormEvent) => void;
  errGlobalMsg?: string;
};

const Layout = (props: TParticipantEditModalLayoutProps): React.ReactElement | null => {
  const {
    participant,
    teams,
    isMe,
    isLoading,
    hasChanges,
    isGuest,
    defaultValues,
    onCancel,
    onRemove,
    onToggleAdminRole,
    errors,
    errGlobalMsg,
    formRefs,
    onChangeTeams,
    onSubmit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [targetElement, setTargetElement] = useState<any>();
  const popperIdRef = useRef(`participantEdit-${shortid()}`);

  const renderTooltip = () => {
    if (!isGuest) {
      return null;
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'bottom',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {t('participantEditModal.toggleTooltip')}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  const renderTeams = () => {
    if (!teams.length) {
      return (
        <ContentEmpty>
          {t('participantEditModal.emptyTeams')}
        </ContentEmpty>
      );
    }

    return (
      <Grid
        gridTemplateColumns="1fr"
      >
        {
          teams.map((team, index) => (
            <React.Fragment
              key={team._id.toString()}
            >
              <FormControlLabel
                label={(
                  <Username
                    username={team.name}
                  />
                )}
                mb={index === (teams.length - 1) ? 0 : 2}
              >
                <Checkbox
                  inputRef={formRefs.teamsIds}
                  name={`teamsIds[${index}]`}
                  value={team._id.toString()}
                  checked={
                    team.participantsIds.includes(participant._id)
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeTeams(e, team._id.toString())}
                />
              </FormControlLabel>

              <FormHelperText
                variant="negative"
              >
                {errors.teamsIds && errors.teamsIds[index]?.message}
              </FormHelperText>
            </React.Fragment>
          ))
        }
      </Grid>
    );
  };

  return (
    <Modal
      {...other}
    >
      <PaperHeader>
        {t('participantEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <FormControl>
          <Input
            name="username"
            defaultValue={defaultValues.username}
            disabled
          />
        </FormControl>

        <FormControl>
          <Input
            name="email"
            defaultValue={defaultValues.email}
            disabled
          />
        </FormControl>

        {
          !isMe && (
            <Box
              ref={setTargetElement}
            >
              <FormControl>
                <FormControlLabel
                  disabled={isGuest}
                  label={t('participantEditModal.toggleAdmin')}
                >
                  <Switcher
                    disabled={isGuest}
                    name="participant-role"
                    checked={participant.role === SPACE_PARTICIPANT_ROLE.ADMIN}
                    onChange={onToggleAdminRole}
                  />
                </FormControlLabel>
              </FormControl>
              {renderTooltip()}
            </Box>
          )
        }
        <FormControl
          mt={6}
        >
          <FormLabel>
            {t('participantEditModal.memberTeams')}
          </FormLabel>
          {renderTeams()}
        </FormControl>
        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          {
            !isMe && (
              <Button
                onClick={onRemove}
              >
                {t('participantEditModal.removeBtn')}
              </Button>
            )
          }

          <Button
            onClick={onCancel}
          >
            {t('participantEditModal.cancelBtn')}
          </Button>
          <Button
            onClick={onSubmit}
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
          >
            {t('participantEditModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
