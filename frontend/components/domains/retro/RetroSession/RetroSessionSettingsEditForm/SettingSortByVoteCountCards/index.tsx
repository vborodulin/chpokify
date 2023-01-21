import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TFormData, TFormRefs } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';

import { FormControl } from '@components/uiKit/FormControl';
import { Switcher } from '@components/uiKit/Switcher';

import { TFormErrors } from '@lib/types/form';

type TSettingVoteCountCardsProps = {
  formRefs: Pick<TFormRefs, 'isSortByVotesCount'>;
  errors: TFormErrors<TFormData>;
  onChange: () => void;
}

const SettingSortByVoteCountCards = (props: TSettingVoteCountCardsProps): React.ReactElement | null => {
  const {
    errors,
    formRefs,
    onChange,
  } = props;

  const isSortByVotesCount = useSelector(retroSessionsSelectors.getIsSortByVotesCount);

  return (
    <FormControl
      errorMessage={errors.isSortByVotesCount?.message}
    >
      <Switcher
        name="isSortByVotesCount"
        checked={isSortByVotesCount}
        onChange={onChange}
        inputProps={{
          ref: formRefs.isSortByVotesCount,
        }}
      />
    </FormControl>
  );
};

export {
  SettingSortByVoteCountCards,
};
