import { TEntityID } from '@chpokify/models-types';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { PokerCardSetPreview } from '@components/domains/poker/PokerCardSetPreview';
import {
  StoriesIntegrationsJiraForm,
  TFormJiraRefs,
} from '@components/domains/stories/StoriesAddModal/StoriesIntegrations/StoriesIntegrationsJiraForm';
import { INTEGRATION_LIST_INPUT_TYPE } from '@components/domains/stories/types';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Checkbox } from '@components/uiKit/CheckBox';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { FormControl } from '@components/uiKit/FormControl';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { IconJira, IconRefresh } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Instruction } from '@components/uiKit/Instruction';
import { LinkComponent } from '@components/uiKit/Link';
import { Select, TSelectOption } from '@components/uiKit/Select';
import { SwitcherWithText } from '@components/uiKit/SwitcherWithText';

import { TRANS } from '@components/utils/types';

import { ClientError, HttpError } from '@lib/errors';
import { TFormErrors } from '@lib/types/form';

export type TFormData = {
    title: string;
    description?: string;
    isAutoReveal: boolean;
    isVideoCall: boolean;
    cardSetId: string;
    projectJira?: string;
    fieldJira?: string;
    baseUrl?: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
  'isAutoReveal',
  'cardSetId',
  'projectJira',
  'fieldJira',
  'baseUrl',
];

export type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;
export type TPokerSessionEditFormProps = Partial<TBoxProps> & {
    formId: string;
    formRefs: TFormRefs;
    formRefsJira: TFormJiraRefs;
    defaultValue: Partial<TFormData>;
    errors: TFormErrors<TFormData>;
    errGlobalMsg: string;
    isLoading: boolean;
    isEdit: boolean;
    onSubmit: () => void;
    onRefreshIntegrations: () => void;
    cardSetId?: TEntityID;
    setIsShowIntegJira: () => void;
    onClickConnectingJira: () => void;
    isShowIntegJira: boolean;
    isConnectedJira: boolean;
    domainOptions: TSelectOption[];
    jiraProjectsOptions: TSelectOption[];
    jiraFieldsOptions: TSelectOption[];
    hasJiraInPokerSession?: boolean;
    jiraApiErr: ClientError | HttpError | undefined
    cardDecksOptions: TSelectOption[]
};

const PokerSessionEditForm = (props: TPokerSessionEditFormProps): React.ReactElement | null => {
  const {
    formId,
    formRefs,
    formRefsJira,
    defaultValue,
    errors,
    isLoading,
    isEdit,
    cardSetId,
    onSubmit,
    isShowIntegJira,
    setIsShowIntegJira,
    isConnectedJira,
    domainOptions,
    jiraProjectsOptions,
    jiraFieldsOptions,
    errGlobalMsg,
    onRefreshIntegrations,
    jiraApiErr,
    cardDecksOptions,
    onClickConnectingJira,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const defaultCardDeck = defaultValue.cardSetId || cardDecksOptions[0].value;

  const defaultValueForIntegrations = {
    baseUrl: defaultValue.baseUrl,
    fieldJira: defaultValue.fieldJira,
    projectJira: defaultValue.projectJira,
  };

  const renderSwitcherJira = () => (
    <SwitcherWithText
      onClickBox={setIsShowIntegJira}
      id="show-integ-jira"
      name="showIntegJira"
      checked={isShowIntegJira}
      boxCss={{
        my: 4,
      }}
      textCss={{
        color: 'font.primary',
      }}
      title={t('storiesAddModal.useJira')}
    />
  );

  const renderVideoCallCheckbox = () => (
    <FormControl
      errorMessage={get(errors, 'settings.isVideoCall.message')}
    >
      <FormControlLabel
        label={t('pokerSessionEditForm.isVideoCallLabel')}
      >
        <Checkbox
          inputRef={formRefs.isVideoCall}
          name="isVideoCall"
          defaultChecked={defaultValue.isVideoCall}
        />
      </FormControlLabel>
    </FormControl>
  );

  const renderAutoRevealCheckbox = () => (
    <FormControl
      errorMessage={get(errors, 'settings.isAutoReveal.message')}
    >
      <FormControlLabel
        label={t('pokerSessionEditForm.isAutoRevealLabel')}
      >
        <Checkbox
          inputRef={formRefs.isAutoReveal}
          name="isAutoReveal"
          defaultChecked={defaultValue.isAutoReveal}
        />
      </FormControlLabel>
    </FormControl>
  );

  const renderInstructionToConnectJira = () => (
    <Instruction
      onClickBox={onClickConnectingJira}
      title={t('storiesAddModal.connectedToJira')}
      icon={(
        <IconJira
          fill="primary.normal"
        />
            )}
      mt={6}
    />
  );

  const renderIntegJira = () => {
    if (!isShowIntegJira) {
      return null;
    }

    return (
      <>
        <FormControl>
          <StoriesIntegrationsJiraForm
            mt={2}
            defaultValue={defaultValueForIntegrations}
            formRefs={formRefsJira}
            type={INTEGRATION_LIST_INPUT_TYPE.ADD_SESSION}
            domainOptions={domainOptions}
            jiraProjectsOptions={jiraProjectsOptions}
            jiraFieldsOptions={jiraFieldsOptions}
            errors={errors}
            disabledFields={
                isEdit ? {
                  domain: true,
                  project: true,
                } : undefined
            }
          />
        </FormControl>
        {
         jiraApiErr && (
         <Flex
           alignItems="center"
           mt={2}
         >
           <FormHelperText
             variant="negative"
             mt={0}
           >
             {jiraApiErr?.message}
           </FormHelperText>
           {
             jiraApiErr?.code === 401
                   && (
                   <LinkComponent
                     StartIcon={IconRefresh}
                     fontSize={2}
                     onClick={onRefreshIntegrations}
                   >
                     {t('jiraIntegration.existingIntegrations.refreshNowBtn')}
                   </LinkComponent>
             )
           }
         </Flex>
         )
        }
      </>
    );
  };

  const renderBlockJira = () => {
    if (!isConnectedJira) {
      return renderInstructionToConnectJira();
    }

    return (
      <>
        <Divider
          mt={6}
        />
        {
            renderSwitcherJira()
        }
        {
            renderIntegJira()
        }
      </>
    );
  };

  return (
    <Box
      id={formId}
      as="form"
      onSubmit={onSubmit}
    >
      <Box
        as="fieldset"
        disabled={isLoading}
      >
        <Box>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={formRefs.title}
              name="title"
              defaultValue={defaultValue.title}
              placeholder={t('pokerSessionEditForm.titlePlaceholder')}
              autoFocus
            />
          </FormControl>

          <FormControl
            errorMessage={errors.description?.message}
          >
            <Input
              inputRef={formRefs.description}
              name="description"
              defaultValue={defaultValue.description}
              placeholder={t('pokerSessionEditForm.descriptionPlaceholder')}
            />
          </FormControl>
        </Box>
        <Divider
          mt={6}
          mb={6}
        />
        <Box>
          <FormControl>
            <FormLabel>
              {t('pokerSessionEditForm.cardDeckLabel')}
            </FormLabel>

            <Select
              inputRef={formRefs.cardSetId}
              name="cardSetId"
              defaultValue={defaultCardDeck}
              options={cardDecksOptions}
            />

            <PokerCardSetPreview
              mt={2}
              cardSetId={cardSetId || defaultCardDeck}
            />
          </FormControl>
          <Divider
            my={6}
          />
          {
              renderAutoRevealCheckbox()
          }
          {
              renderVideoCallCheckbox()
          }
        </Box>
        {
            renderBlockJira()
        }
        <Divider
          mt={6}
        />
      </Box>
      <FormHelperText
        variant="negative"
        mt={0}
      >
        {errGlobalMsg}
      </FormHelperText>
    </Box>
  );
};

PokerSessionEditForm.displayName = 'PokerSessionEditForm';

export {
  PokerSessionEditForm,
};
