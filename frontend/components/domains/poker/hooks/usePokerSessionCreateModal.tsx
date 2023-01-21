import { pokerSessionsSchemas } from '@chpokify/api-schemas';
import { arrayHelpers, objectHelpers } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { TPokerSession } from '@chpokify/models-types/pokerSession';
import { routing } from '@chpokify/routing';
import { omit, pick } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { authSelectors } from '@Redux/domains/auth/selectors';
import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { jiraOperations } from '@Redux/domains/jira/operations';
import { jiraSelectors } from '@Redux/domains/jira/selectors';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { FORM_FIELDS, TFormData, TPokerSessionEditFormProps } from '@components/domains/poker/PokerSessionEditForm';

import { TSelectOption } from '@components/uiKit/Select';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

type TUsePokerSessionCreateModal = Omit<TPokerSessionEditFormProps, 'onSubmit'> & {
  onSubmit: (data: TFormData) => Promise<void>;
  onRefreshIntegrations: () => Promise<void>;
};

type TUsePokerSessionCreateModalProps = {
  edit?: boolean;
  pokerSessionId?: TEntityID;
  onClose?: () => void,
  pokerSession?: TPokerSession
};

const usePokerSessionCreateModal = (props: TUsePokerSessionCreateModalProps): TUsePokerSessionCreateModal => {
  const {
    pokerSession,
    edit = false,
    pokerSessionId = '',
    onClose = () => {
    },
  } = props;

  const router = useRouter();

  const dispatch = useAppDispatch();

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const jiraUrls = useSelector(authSelectors.jiraUrls);
  const jiraProjects = useSelector(jiraSelectors.getProjects);
  const jiraFields = useSelector(jiraSelectors.getFields);
  const isConnectedJira = useSelector(authSelectors.isConnectedJira);
  const lastPokerSession = useSelector(pokerSessionsSelectors.getLastEntity);

  const hasJiraInPokerSession = !objectHelpers.isEmptyObject(pokerSession?.jira || {});

  const [isShowIntegJira, setIsShowIntegJira] = useState<boolean>(isConnectedJira);

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
    watch,
    setError,
  } = useForm<TFormData>();

  const watchCardSetId = watch('cardSetId');
  const watchBaseUrl = watch('baseUrl');

  const jiraApiErr = useSelector(asyncRejectedSelectors.createErrorSelector)([
    jiraActionTypes.PROJECTS_IMPORT_PENDING,
    jiraActionTypes.FIELDS_IMPORT_PENDING,
  ]);

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerSessionsActionsTypes.CREATE_PENDING, pokerSessionsActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const domainOptions: TSelectOption[] = jiraUrls.map((url) => {
    const { hostname } = new URL(url);
    return {
      label: hostname,
      value: url,
    };
  });

  const baseUrl = useMemo(
    () => {
      let localBaseUrl = watchBaseUrl;

      if (!watchBaseUrl && isConnectedJira) {
        if (!edit || objectHelpers.isEmptyObject(pokerSession?.jira as {})) {
          localBaseUrl = domainOptions[0].value;
        } else {
          localBaseUrl = pokerSession?.jira?.baseUrl;
        }
      }

      return localBaseUrl;
    },
    [watchBaseUrl, isConnectedJira, edit, pokerSession, domainOptions]
  ) as string;

  const jiraOptions: { projects: TSelectOption[], fields: TSelectOption[] } = useMemo(() => {
    let projects: TSelectOption[] = [];
    let fields: TSelectOption[] = [];

    if (!arrayHelpers.isEmptyArr(jiraProjects[baseUrl])) {
      projects = jiraProjects[baseUrl].map((el) => ({
        label: el.name,
        value: el.id,
      }));

      if (!arrayHelpers.isEmptyArr(jiraFields[baseUrl])) {
        fields = jiraFields[baseUrl].map((el) => ({
          label: el.name,
          value: el.id,
        }));
      }
    }

    return {
      projects,
      fields,
    };
  }, [JSON.stringify(jiraProjects), baseUrl, JSON.stringify(jiraFields)]);

  useEffect(() => {
    if (isConnectedJira && baseUrl) {
      if (!jiraProjects[baseUrl]) {
        dispatch(jiraAsyncActions.getProjects(baseUrl));
      }

      if (!jiraFields[baseUrl]) {
        dispatch(jiraAsyncActions.getFields(baseUrl));
      }
    }
  }, [isConnectedJira, baseUrl]);

  useEffect(() => {
    if (edit) {
      if (!arrayHelpers.isEmptyArr(jiraOptions.projects)) {
        setValue('projectJira', pokerSession?.jira?.project?.id);
      }

      if (!arrayHelpers.isEmptyArr(jiraOptions.fields)) {
        setValue('fieldJira', pokerSession?.jira?.field?.id);
      }
    }
  }, [JSON.stringify(jiraOptions), JSON.stringify(pokerSession), edit]);

  const onClickConnectingJira = () => {
    window.open(routing.getJiraConnectUrl(), '_blank');
  };

  const onRefreshIntegrations = async () => {
    if (!baseUrl) return;
    await jiraOperations.refreshIntegration(baseUrl)(dispatch);
  };

  const handleToggleIntegJira = () => {
    setIsShowIntegJira((prevVal) => !prevVal);
  };

  const enhanceFormData = (data: TFormData): pokerSessionsSchemas.TCreateBodyReq => ({
    ...data,
    spaceId,
    teamsIds: [],
  });

  const onSubmit = async (data: TFormData) => {
    const {
      fieldJira,
      projectJira,
      baseUrl: baseUrlInput,
      ...otherField
    } = data;
    const dataSend = enhanceFormData(otherField);
    const jira = {} as pokerSessionsSchemas.TJiraBodyReq;

    if (baseUrlInput) {
      jira.field = pick(jiraFields[baseUrl].find((item) => item.id === fieldJira), ['id', 'key', 'name']);
      jira.project = pick(jiraProjects[baseUrl].find((item) => item.id === projectJira), ['id', 'key', 'name']);
      jira.baseUrl = baseUrlInput;
    }

    dataSend.jira = jira;

    if (edit) {
      const { payload } = await dispatch(
        pokerSessionsAsyncActions.update(pokerSessionId, omit(dataSend, ['spaceId', 'teamsIds']))
      );

      if (!getIsRejectedActionPayload(payload)) {
        onClose();
      }
    } else {
      const { payload } = await dispatch(
        pokerSessionsAsyncActions.create(dataSend)
      );

      if (!getIsRejectedActionPayload(payload)) {
        await router.push(
          routing.getPokerSessionUrlTemplate(),
          routing.getPokerUrl(spaceId, payload.pokerSession._id)
        );
        dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_TEAMS_EDIT, {
          pokerSessionId: payload.pokerSession._id,
          lastPokerSessionId: lastPokerSession?._id,
          isCreateSession: true,
        }));
      }
    }
  };

  return {
    isShowIntegJira,
    handleToggleIntegJira,
    onSubmit,
    domainOptions,
    jiraOptions,
    isConnectedJira,
    register,
    watchCardSetId,
    errors,
    formState,
    handleSubmit,
    hasJiraInPokerSession,
    errGlobalMsg,
    onRefreshIntegrations,
    onClickConnectingJira,
    jiraApiErr,
  };
};

export {
  usePokerSessionCreateModal,
};
