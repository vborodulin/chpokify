import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingVoteCountCardsProps = {
  formRefs: Pick<TFormRefs, 'isHiddenVoteCountCards'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingVoteCountCards = (props: TSettingVoteCountCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const isHiddenVoteCountCards = useSelector(retroSessionsSelectors.getIsHiddenVoteCountCards);
  const isDisableVotingCards = useSelector(retroSessionsSelectors.getIsDisableVotingCards);

  return (
    <FormControl
      errorMessage={errors.isHiddenVoteCountCards?.message}
    >
      <Switcher
        name="isHiddenVoteCountCards"
        checked={!isHiddenVoteCountCards}
        disabled={isDisableVotingCards}
        onChange={onChange}
        inputProps={{
          ref: formRefs.isHiddenVoteCountCards,
        }}
      />
    </FormControl>
  );
};

export {
  SettingVoteCountCards,
};
