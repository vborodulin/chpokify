import { useTranslation } from 'next-i18next';
import React from 'react';
import { css } from 'styled-components';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';
import { SpaceInviteBtn } from '@components/domains/space/buttons/SpaceInviteBtn';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { DividerWithText } from '@components/uiKit/DividerWithText';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconMailOutline } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Select, TSelectOption } from '@components/uiKit/Select';
import { SwitcherWithText } from '@components/uiKit/SwitcherWithText';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  email: string;
  teamId: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'email',
  'teamId',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TInviteToSpaceModalLayoutProps = {
  teamsOptions: TSelectOption[];
  isShowTeams: boolean;
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  isEmailSent: boolean;
  sentEmail: string;
  onToggleShowTeams: () => void;
  onSendInvite: () => void;
}

const Layout = (props: TInviteToSpaceModalLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    teamsOptions,
    isShowTeams,
    errors,
    errGlobalMsg,
    isLoading,
    isEmailSent,
    sentEmail,
    onToggleShowTeams,
    onSendInvite,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      data-test-id={DATA_TEST_ID.SPACE_INVITE_MODAL}
      data-tut-space={SPACE_ONBOARDING_STEP_ID.INVITE_MODAL}
    >
      <PaperHeader>
        {t('inviteToSpaceModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <Text
            fontSize={4}
            fontWeight={1}
            mb={4}
          >
            {t('inviteToSpaceModal.sendInviteEmailTitle')}
          </Text>

          <FormControl
            errorMessage={errors.email?.message}
          >
            <Input
              inputRef={formRefs.email}
              name="email"
              placeholder={t('inviteToSpaceModal.emailPlaceholder')}
            />
          </FormControl>

          {
            !!teamsOptions.length && (
              <SwitcherWithText
                onClickBox={onToggleShowTeams}
                id="show-teams"
                name="showTeams"
                checked={isShowTeams}
                mb={4}
                boxCss={{
                  marginBottom: 4,
                }}
                textCss={{
                  color: 'font.primary',
                }}
                title={t('inviteToSpaceModal.showTeamsSwitcherLabel')}
              />
            )
          }

          {
            isShowTeams && (
              <FormControl
                errorMessage={errors.teamId?.message}
              >
                <Select
                  inputRef={formRefs.teamId}
                  name="teamId"
                  placeholder={t('inviteToSpaceModal.selectTeamPlaceholder')}
                  options={teamsOptions}
                />
              </FormControl>
            )
          }

          <FormHelperText
            variant="negative"
            mt={0}
            mb={4}
          >
            {errGlobalMsg}
          </FormHelperText>

          {
            isEmailSent && (
              <FormHelperText
                variant="positive"
                mt={0}
                mb={4}
              >
                {t('inviteToSpaceModal.successEmailSentHelperText', {
                  email: sentEmail,
                })}
              </FormHelperText>
            )
          }

          <PaperActions
            justifyContent="flex-start"
          >
            <Button
              variant="primary"
              StartIcon={IconMailOutline}
              disabled={isLoading}
              onClick={onSendInvite}
            >
              {t('inviteToSpaceModal.sendInviteBtn')}
            </Button>
          </PaperActions>
        </fieldset>

        <DividerWithText
          my={6}
        >
          {t('inviteToSpaceModal.dividerLabel')}
        </DividerWithText>

        <Box>
          <Text
            fontSize={4}
            fontWeight={1}
            mb={4}
          >
            {t('inviteToSpaceModal.sendInviteLinkTitle')}
          </Text>

          <SpaceInviteBtn
            css={css`float: left`}
          >
            {t('spaceButtons.inviteToSpaceBtn.title')}
          </SpaceInviteBtn>
        </Box>
      </PaperContent>
    </Modal>
  );
};

export {
  Layout,
};
