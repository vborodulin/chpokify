import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingOneVoteCardsProps = {
  formRefs: Pick<TFormRefs, 'isOneVoteCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingOneVoteCards = (props: TSettingOneVoteCardsProps): React.ReactElement => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const isOneVoteCards = useSelector(retroSessionsSelectors.getIsOneVoteCards);

  return (
    <FormControl
      errorMessage={errors.isOneVoteCards?.message}
    >
      <Switcher
        name="isOneVoteCards"
        checked={isOneVoteCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.isOneVoteCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingOneVoteCards,
};
