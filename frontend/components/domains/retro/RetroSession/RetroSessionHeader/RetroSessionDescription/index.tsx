import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { Text, TTextProps } from '@components/uiKit/Text';

type TRetroSessionDescriptionProps = Partial<TTextProps>;

const RetroSessionDescription = (props: TRetroSessionDescriptionProps): React.ReactElement => {
  const {
    ...other
  } = props;

  const description = useSelector(retroSessionsSelectors.getDescription);

  return (
    <Text
      fontSize={2}
      color="font.d_10"
      mt={1}
      {...other}
    >
      {description}
    </Text>
  );
};

export {
  RetroSessionDescription,
};
