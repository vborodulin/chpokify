import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingUserNameCardsProps = {
  formRefs: Pick<TFormRefs, 'isHiddenUserNameCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingUserNameCards = (props: TSettingUserNameCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const isHiddenUserNameCards = useSelector(retroSessionsSelectors.getIsHiddenUserNameCards);

  return (
    <FormControl
      errorMessage={errors.isHiddenUserNameCards?.message}
    >
      <Switcher
        name="isHiddenUserNameCards"
        checked={!isHiddenUserNameCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.isHiddenUserNameCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingUserNameCards,
};
