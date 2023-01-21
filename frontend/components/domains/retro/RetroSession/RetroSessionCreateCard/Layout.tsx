import { useTranslation } from 'next-i18next';
import React from 'react';

import { TFormData } from '@components/domains/retro/RetroSession/RetroSessionCreateCard';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

type TLayoutProps = Partial<TBoxProps> & {
  formId: string;
  errors: TFormErrors<TFormData>;
  formRefs: TFormRefs;
  isDirty: boolean;
  isColumnAction: boolean;
  errGlobalMsg: string;
  onSubmit: () => void;
  onCancel: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement => {
  const {
    formId,
    errors,
    formRefs,
    isColumnAction,
    isDirty,
    errGlobalMsg,
    onSubmit,
    onCancel,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Box
      id={formId}
      as="form"
      p={2}
      bg="surface.a_20"
      borderRadius={2}
      onSubmit={onSubmit}
      {...other}
    >
      <fieldset>

        <FormControl
          errorMessage={errors.title?.message}
        >
          <Input
            inputRef={formRefs.title}
            name="title"
            placeholder={t('pages.retro.cardCreate.titlePlaceholder')}
            autoFocus
            multiline
            rows={1}
            isAutoResize
          />
        </FormControl>

        {
          !isColumnAction
          && (
          <FormControl
            errorMessage={errors.description?.message}
          >
            <Input
              inputRef={formRefs.description}
              name="description"
              placeholder={t('pages.retro.cardCreate.descriptionPlaceholder')}
              rows={3}
              multiline
              isAutoResize
            />
          </FormControl>
          )
        }

      </fieldset>

      <FormHelperText
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>

      <Flex
        mt={4}
        gap={4}
      >
        <Button
          form={formId}
          variant="primary"
          onClick={onSubmit}
          disabled={!isDirty}
          flexGrow={1}
        >
          {t('pages.retro.cardCreate.submitBtn')}
        </Button>

        <Button
          flexGrow={1}
          onClick={onCancel}
        >
          {t('pages.retro.cardCreate.cancelBtn')}
        </Button>
      </Flex>

    </Box>
  );
};

export {
  Layout,
};
