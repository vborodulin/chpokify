import { JQL_MAX_LENGTH } from '@chpokify/models-types/core/integrations';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { INTEGRATION_LIST_INPUT_TYPE } from '@components/domains/stories/types';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Input } from '@components/uiKit/Input';
import { LinkComponent } from '@components/uiKit/Link';
import { Select, TSelectOption } from '@components/uiKit/Select';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { NeverError } from '@lib/errors';

type TFormData = {
  baseUrl: string;
  jql?: string;
  projectJira?: string;
  fieldJira?: string;
};

export type TFormJiraRefs = Partial<Record<keyof TFormData, React.Ref<HTMLInputElement>>>;
export type TDefaultValue = Partial<Record<keyof TFormData, string>>;

type TDisabledInputs = {
  domain?: true,
  project?: true,
  field?: true
}
export type TStoriesIntegrationJiraFormProps = Partial<TBoxProps> & {

  errors: Record<string, any>;
  domainOptions?: TSelectOption[];
  jiraProjectsOptions?: TSelectOption[];
  jiraFieldsOptions?: TSelectOption[];
  type: INTEGRATION_LIST_INPUT_TYPE,
  formRefs: TFormJiraRefs;
  defaultValue?: TDefaultValue,
  disabledFields?: TDisabledInputs;
}

const StoriesIntegrationsJiraForm = (props: TStoriesIntegrationJiraFormProps): React.ReactElement | null => {
  const {
    defaultValue,
    errors,
    formRefs,
    domainOptions,
    jiraProjectsOptions,
    jiraFieldsOptions,
    type,
    disabledFields,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderInputJQL = () => (
    <FormControl
      errorMessage={errors.jql?.types?.message}
    >
      <FormLabel
        fontSize={2}
      >
        {t('storiesIntegrationImport.jqlLabel')}
      </FormLabel>

      <Input
        my={2}
        name="jql"
        inputRef={formRefs.jql}
        placeholder={t('storiesIntegrationImport.jqlPlaceholder')}
        maxLength={JQL_MAX_LENGTH}
      />

      <LinkComponent
        fontSize={1}
        fontWeight={0}
        href="https://www.atlassian.com/software/jira/guides/expand-jira/jql"
        isExternal
        mt={1}
      >
        {t('storiesIntegrationImport.getStartedJql')}
      </LinkComponent>
    </FormControl>
  );

  const renderInputBaseUrl = () => (
    <FormControl
      errorMessage={errors.baseUrl?.types?.message}
    >
      <FormLabel
        disabled={disabledFields?.domain}
      >
        {t('storiesIntegrationImport.domainLabel')}
      </FormLabel>

      <Select
        disabled={disabledFields?.domain}
        name="baseUrl"
        inputRef={formRefs.baseUrl}
        options={domainOptions as []}
        defaultValue={defaultValue?.baseUrl}
      />

    </FormControl>
  );

  const renderInputProject = () => (
    <FormControl
      errorMessage={errors.projectJira?.types?.message}
    >
      <FormLabel
        disabled={disabledFields?.project}
      >
        {t('storiesIntegrationImport.projectLabel')}
      </FormLabel>

      <Select
        disabled={disabledFields?.project}
        name="projectJira"
        inputRef={formRefs.projectJira}
        options={jiraProjectsOptions as []}
        defaultValue={defaultValue?.projectJira}
      />

    </FormControl>
  );

  const renderInputFieldSync = () => (
    <FormControl
      errorMessage={errors.fieldJira?.types?.message}
    >
      <FormLabel>
        {t('storiesIntegrationImport.selectJiraField')}
      </FormLabel>
      <Select
        name="fieldJira"
        inputRef={formRefs.fieldJira}
        options={jiraFieldsOptions as []}
        defaultValue={defaultValue?.fieldJira}
      />
    </FormControl>
  );

  const renderTextBaseUrl = () => {
    const { hostname } = new URL(defaultValue?.baseUrl as string);
    return (
      <Box
        mb={6}
      >
        <Text
          fontSize={1}
          mb={2}
        >
          {t('storiesAddModal.jiraAccount')}
        </Text>
        <Text
          fontWeight={1}
          fontSize={2}
          font
          color="font.normal"
        >
          {hostname}
        </Text>
      </Box>
    );
  };

  const renderTextProject = () => (
    <Box
      mb={6}
    >
      <Text
        fontSize={1}
        mb={2}
      >
        {t('storiesAddModal.jiraProject')}
      </Text>
      <Text
        fontWeight={1}
        fontSize={2}
        font
        color="font.normal"
      >
        {defaultValue?.projectJira}
      </Text>
    </Box>
  );

  const renderToStories = () => (
    <Box
      {...other}
    >
      {renderInputBaseUrl()}
      {renderInputJQL()}
    </Box>
  );

  const renderToSessions = () => (
    <Box
      {...other}
    >
      {renderInputBaseUrl()}
      {renderInputProject()}
      {renderInputFieldSync()}
    </Box>
  );

  const renderToImportWithJira = () => (
    <Box
      {...other}
    >
      {renderTextBaseUrl()}
      {renderTextProject()}
      {renderInputFieldSync()}
      {renderInputJQL()}
    </Box>
  );

  switch (type) {
    case INTEGRATION_LIST_INPUT_TYPE.ADD_STORIES:
      return renderToStories();
    case INTEGRATION_LIST_INPUT_TYPE.ADD_SESSION:
      return renderToSessions();
    case INTEGRATION_LIST_INPUT_TYPE.ADD_STORIES_WITH_IMPORT_JIRA:
      return renderToImportWithJira();

    default:
      throw new NeverError(type);
  }
};

export { StoriesIntegrationsJiraForm };
