import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { Text, TTextProps } from '@components/uiKit/Text';

type TRetroSessionTitleProps = Partial<TTextProps> & {
  onClickEditModal: () => void;
  canModerate: boolean
};

const RetroSessionTitle = (props: TRetroSessionTitleProps): React.ReactElement | null => {
  const {
    canModerate,
    onClickEditModal,
    ...other
  } = props;

  const title = useSelector(retroSessionsSelectors.getTitle);

  return (
    <Text
      as="h1"
      lineHeight={1}
      fontSize={[6, 8]}
      fontWeight={1}
      role={canModerate ? 'button' : ''}
      canHover={canModerate}
      onClick={onClickEditModal}
      {...other}
    >
      {title}
    </Text>
  );
};

export {
  RetroSessionTitle,
};
