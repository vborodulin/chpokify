import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { kanbanBoardRelationsAsyncActions } from '@Redux/domains/kanbanBoardRelations/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

type TFormData = {
  title: string,
  description: string,
}

export type TLayoutProps = TBoxProps & {
  onCancel: () => void;
  spaceId: TEntityID
  boardId: TEntityID
  columnId: TEntityID
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    onCancel,
    spaceId,
    boardId,
    columnId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const {
    register,
    handleSubmit,
    formState: {
      dirty,
    },
  } = useForm<TFormData>();

  const dispatch = useAppDispatch();

  const enhanceData = (data: TFormData) => ({
    title: data.title,
    description: data.description,
  });

  const onSubmit = async (data: TFormData) => {
    const sendData = enhanceData(data);
    const { payload } = await dispatch(
      kanbanBoardRelationsAsyncActions.createTask(spaceId, boardId, columnId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onCancel();
    }
  };

  return (
    <Box
      p={2}
      bg="surface.normal"
      {...other}
    >
      <Input
        inputRef={register}
        name="title"
        placeholder={t('kanbanTaskCreate.titlePlaceholder')}
        mb={2}
        autoFocus
      />

      <Input
        multiline
        rows={3}
        inputRef={register}
        name="description"
        placeholder={t('kanbanTaskCreate.descriptionPlaceholder')}
      />

      <Grid
        gridTemplateColumns="1fr 1fr"
        gridGap={3}
        mt={4}
      >
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!dirty}
        >
          {t('kanbanTaskCreate.submitBtn')}
        </Button>

        <Button
          onClick={onCancel}
        >
          {t('kanbanTaskCreate.cancelBtn')}
        </Button>
      </Grid>
    </Box>
  );
};

export {
  Layout,
};
