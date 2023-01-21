import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsCardsActionsTypes } from '@Redux/domains/retroSessionsCards/actionsTypes';
import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Checkbox } from '@components/uiKit/CheckBox';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

type TFormData = {
  isCompleted: boolean;
}

const FORM_FIELDS: (keyof TFormData)[] = [
  'isCompleted',
];

type TSettingCompletedCardProps = TBoxProps & {
  cardId: string;
}

const SettingCompletedCard = (props: TSettingCompletedCardProps): React.ReactElement | null => {
  const {
    cardId,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const isCardCompleted = useSelector(retroSessionsCardsSelectors.getIsCompleted)(cardId);
  const canEditCards = useSelector(retroSessionRepoSelectors.getCanEditCardsWithCanModerate);

  const {
    register,
    handleSubmit,
    errors,
    setError,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsCardsActionsTypes.UPDATE_PENDING],
    [...FORM_FIELDS, cardId],
    setError
  );

  const onSubmit = async (data: TFormData) => {
    if (!canEditCards) {
      return;
    }

    await dispatch(retroSessionsCardsAsyncActions.update(currSpaceId, cardId, data));
  };

  return (
    <Box
      {...other}
    >
      <FormControl
        errorMessage={errors.isCompleted?.message}
      >
        <Checkbox
          inputRef={register}
          name="isCompleted"
          onChange={handleSubmit(onSubmit)}
          checked={isCardCompleted}
          disabled={!canEditCards}
        />
      </FormControl>
      <FormHelperText
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>
    </Box>
  );
};

export {
  SettingCompletedCard,
};
