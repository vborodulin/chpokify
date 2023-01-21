import { TStory } from '@chpokify/models-types';
import { compact } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { storiesActionsTypes } from '@Redux/domains/stories/actionsTypes';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { Text } from '@components/uiKit/Text';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

import { detect } from '@lib/detect';

export const FORM_ID = 'storiesAddMany';

export type TFormData = {
  stories: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'stories',
];

export type TStoriesFreeformInputProps = {
  onClose: () => void;
  onAfterSubmit?: (data: { stories: TStory[] }) => Promise<void>;
};

const StoriesFreeformInput = (props: TStoriesFreeformInputProps): React.ReactElement | null => {
  const {
    onClose,
    onAfterSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useDispatch<TAppDispatch>();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<TFormData>();

  const convertToStories = (data: TFormData): { title: string }[] =>
    compact(
      data.stories
        .split(/\r?\n/)
        .map((item) => item.trim())
    )
      .map((title) => ({
        title,
      }));

  const { errGlobalMsg } = useAsyncActionInfo(
    [storiesActionsTypes.CREATE_MANY_PENDING],
    FORM_FIELDS,
    setError
  );

  const onSubmit = async (data: TFormData) => {
    const res = await dispatch(storiesAsyncActions.createMany(
      currSpaceId,
      {
        stories: convertToStories(data),
      }
    ));

    if (getIsRejectedActionPayload(res.payload)) {
      return;
    }

    if (onAfterSubmit) {
      await onAfterSubmit({
        stories: res.payload.stories,
      });
    }

    onClose();
  };

  return (
    <>
      <PaperContent
        id={FORM_ID}
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          as="fieldset"
          disabled={formState.isSubmitting}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('storiesAddModal.freeformInput.description')}
          </Text>

          <FormControl
            errorMessage={errors.stories?.message}
          >
            <Input
              inputRef={register}
              name="stories"
              multiline
              rows={5}
              placeholder={
                detect.getIsMobile()
                  ? t('storiesAddModal.freeformInput.placeholderMobile')
                  : t('storiesAddModal.freeformInput.placeholder')
              }
              autoFocus
            />
          </FormControl>

          <FormHelperText
            variant="negative"
          >
            {errGlobalMsg}
          </FormHelperText>
        </Box>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('storiesAddModal.freeformInput.cancelBtn')}
          </Button>

          <Button
            form={FORM_ID}
            type="submit"
            variant="primary"
            disabled={!formState.dirty || formState.isSubmitting}
          >
            {t('storiesAddModal.freeformInput.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </>
  );
};

export {
  StoriesFreeformInput,
};
