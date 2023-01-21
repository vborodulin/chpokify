import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { Box } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { Input } from '@components/uiKit/Input';

import { TFormErrors } from '@lib/types/form';

type TSettingMaxVotesCardsProps = {
  formRefs: Pick<TFormRefs, 'maxVotesCard'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
  setValue: (name: string, value: number | string) => void;
}

const WIDTH_SETTINGS_MAX_VOTES = '53';

const SettingMaxVotesCards = (props: TSettingMaxVotesCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
    setValue,
  } = props;

  const isDisableVotingCards = useSelector(retroSessionsSelectors.getIsDisableVotingCards);
  const maxVotesCard = useSelector(retroSessionsSelectors.getMaxVotesCard);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const valueNumber = Number(value);

    if (isNaN(valueNumber) || valueNumber < 0) {
      const replaceValue = value.replace(/[^0-9*]/gm, '');
      const validValue = replaceValue ? Number(replaceValue) : replaceValue;
      setValue('maxVotesCard', validValue);
    }

    if (valueNumber >= 100) {
      setValue('maxVotesCard', 99);
    }

    onChange();
  };

  return (
    <FormControl
      errorMessage={errors.maxVotesCard?.message}
    >
      <Box
        maxWidth={`${WIDTH_SETTINGS_MAX_VOTES}px`}
      >
        <Input
          name="maxVotesCard"
          inputRef={formRefs.maxVotesCard}
          disabled={isDisableVotingCards}
          defaultValue={maxVotesCard?.toString()}
          pattern="[0-9]"
          onChange={handleChange}
        />
      </Box>
    </FormControl>
  );
};

export {
  SettingMaxVotesCards,
};
