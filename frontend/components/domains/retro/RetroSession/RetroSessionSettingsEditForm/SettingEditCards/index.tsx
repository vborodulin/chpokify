import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { TBoxProps } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingEditCardsProps = TBoxProps & {
  formRefs: Pick<TFormRefs, 'canEditCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingEditCards = (props: TSettingEditCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const canEditCards = useSelector(retroSessionsSelectors.getCanEditCards);

  return (
    <FormControl
      errorMessage={errors.canEditCards?.message}
    >
      <Switcher
        name="canEditCards"
        checked={!canEditCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.canEditCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingEditCards,
};
