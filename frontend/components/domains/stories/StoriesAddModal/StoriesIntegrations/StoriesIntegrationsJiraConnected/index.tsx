import { useTranslation } from 'next-i18next';
import React from 'react';

import { CLASS_TEST } from '@components/domains/core/types';
import {
  StoriesIntegrationsJiraForm,
  TDefaultValue,
  TFormJiraRefs,
} from '@components/domains/stories/StoriesAddModal/StoriesIntegrations/StoriesIntegrationsJiraForm';
import { INTEGRATION_LIST_INPUT_TYPE } from '@components/domains/stories/types';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { TSelectOption } from '@components/uiKit/Select';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const FORM_ID = 'stories-add-integration';

type TStoriesIntegrationsJiraConnectedProps = {
  onClose: () => void;
  onSubmit: () => void;
  jiraFieldsOptions: TSelectOption[],
  formRefs: TFormJiraRefs;
  defaultValue: TDefaultValue,
  disabledForm: boolean,
  errors: Record<string, any>;
}

const StoriesIntegrationsJiraConnected = (props: TStoriesIntegrationsJiraConnectedProps)
  : React.ReactElement | null => {
  const {
    onClose,
    onSubmit,
    jiraFieldsOptions,
    formRefs,
    defaultValue,
    errors,
    disabledForm,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderContent = () => (
    <>
      <PaperContent
        id={FORM_ID}
        as="form"
        onSubmit={onSubmit}
      >
        <Text
          fontSize={2}
          mb={4}
        >
          {t('storiesIntegrationImport.description')}
        </Text>
        <Box
          as="fieldset"
          disabled={disabledForm}
        >
          <StoriesIntegrationsJiraForm
            jiraFieldsOptions={jiraFieldsOptions}
            formRefs={formRefs}
            defaultValue={defaultValue}
            type={INTEGRATION_LIST_INPUT_TYPE.ADD_STORIES_WITH_IMPORT_JIRA}
            errors={errors}
          />
        </Box>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('storiesIntegrationImport.cancelBtn')}
          </Button>

          <Button
            form={FORM_ID}
            type="submit"
            variant="primary"
            isLoading={disabledForm}
            className={CLASS_TEST.POKER_SESSION_JIRA_IMPORT_STORIES}
          >
            {t('storiesIntegrationImport.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </>
  );

  return renderContent();
};

export { StoriesIntegrationsJiraConnected };
