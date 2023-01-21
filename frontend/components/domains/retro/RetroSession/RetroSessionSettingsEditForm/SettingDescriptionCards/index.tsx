import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { TBoxProps } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingDescriptionCardsProps = TBoxProps & {
  formRefs: Pick<TFormRefs, 'isHiddenDescriptionCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingDescriptionCards = (props: TSettingDescriptionCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const isHiddenDescriptionCards = useSelector(retroSessionsSelectors.getIsHiddenDescriptionCards);

  return (
    <FormControl
      errorMessage={errors.canEditCards?.message}
    >
      <Switcher
        name="isHiddenDescriptionCards"
        checked={!isHiddenDescriptionCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.isHiddenDescriptionCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingDescriptionCards,
};
