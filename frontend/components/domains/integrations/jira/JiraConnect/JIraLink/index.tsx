import { domHelpers } from '@chpokify/helpers/dom';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

export type TFormData = {
  baseUrl: string;
};

const FORM_FIELDS = [
  'baseUrl',
];

export type TJiraLinkProps = Partial<TBoxProps>;

const JiraLink = (props: TJiraLinkProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState,
    reset,
  } = useForm<TFormData>();

  const {
    errGlobalMsg,
  } = useAsyncActionInfo(
    [jiraActionTypes.OAUTH_MAKE_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    const { payload } = await dispatch(jiraAsyncActions.oauthMake(data));

    if (!getIsRejectedActionPayload(payload)) {
      reset();
      domHelpers.openNewTab(payload.oauthUrl, 60, 60);
    }
  };

  return (
    <Box
      as="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      <FormControl>
        <Input
          name="baseUrl"
          inputRef={register}
          placeholder={t('jiraIntegration.step3.linkPlaceholder')}
        />
      </FormControl>

      <Button
        type="submit"
        variant="primary"
        disabled={formState.isSubmitting}
        mt={3}
        className={CLASS_TEST.JIRA_CONNECT_LINK}
      >
        {t('jiraIntegration.step3.linkBtn')}
      </Button>

      {
        !!errGlobalMsg && (
          <FormHelperText
            variant="negative"
          >
            {errGlobalMsg}
          </FormHelperText>
        )
      }
    </Box>
  );
};

export {
  JiraLink,
};
