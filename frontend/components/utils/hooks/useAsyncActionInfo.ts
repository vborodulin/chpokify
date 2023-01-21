import { useState } from 'react';
import { useSelector } from 'react-redux';

import { asyncFulfilledSelectors } from '@Redux/domains/asyncInfo/fulfilled/selectors';
import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';

import { useDidmount } from '@components/utils/hooks/useDidmount';

const useAsyncActionInfo = (
  actionsNames: string[],
  formFields: string[] = [],
  setFormError?: (name: any, type: string, message: string) => void
) => {
  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)(actionsNames);

  const isFulfilledAction = useSelector(
    asyncFulfilledSelectors.createFulfilledSelector
  )(actionsNames);

  const asyncErr = useSelector(asyncRejectedSelectors.createErrorSelector)(actionsNames);

  const asyncErrFieldsDetails = asyncRejectedSelectors.getFieldsErrDetails(asyncErr, formFields);
  const asyncErrGlobalMsg = asyncRejectedSelectors.getGlobalErrMsg(asyncErr, formFields);

  const [errGlobalMsg, setErrGlobalMsg] = useState<string>('');
  const [isFulfilled, setIsFulfilled] = useState<boolean>(false);

  useDidmount(() => {
    formFields.forEach((field) => {
      if (!setFormError) {
        return;
      }

      setFormError(field, 'serverError', asyncErrFieldsDetails[field]);
    });
  }, [asyncErr]);

  useDidmount(() => {
    setErrGlobalMsg(asyncErrGlobalMsg);
  }, [asyncErrGlobalMsg, asyncErr]);

  useDidmount(() => {
    setIsFulfilled(isFulfilledAction);
  }, [isFulfilledAction, asyncErr]);

  return {
    isLoading,
    isFulfilled,
    errGlobalMsg,
  };
};

export {
  useAsyncActionInfo,
};
