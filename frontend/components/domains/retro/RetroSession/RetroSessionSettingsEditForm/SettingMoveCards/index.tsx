import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { TBoxProps } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingMoveCardsProps = TBoxProps & {
  formRefs: Pick<TFormRefs, 'canMoveCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingMoveCards = (props: TSettingMoveCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const canMoveCards = useSelector(retroSessionsSelectors.getCanMoveCards);

  return (
    <FormControl
      errorMessage={errors.canMoveCards?.message}
    >
      <Switcher
        name="canMoveCards"
        checked={!canMoveCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.canMoveCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingMoveCards,
};
