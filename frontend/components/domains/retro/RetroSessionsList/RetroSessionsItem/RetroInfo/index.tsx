import { dateHelpers } from '@chpokify/helpers';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Text } from '@components/uiKit/Text';

type TRetroInfoProps = Partial<TBoxProps> & {
  retroSessionId: string
}

const RetroInfo = (props: TRetroInfoProps): React.ReactElement | null => {
  const {
    retroSessionId,
    ...other
  } = props;

  const title = useSelector(retroSessionsSelectors.getTitleById)(retroSessionId);
  const createdAt = useSelector(retroSessionsSelectors.getCreatedAtById)(retroSessionId);

  return (
    <Box
      {...other}
    >
      <Text
        fontSize={3}
        fontWeight={1}
        ellipses
        mb={1}
      >
        {title}
      </Text>
      <Box>
        <Text
          as="span"
          fontSize={1}
          color="font.d_20"
        >
          {dateHelpers.formatAppointmentDateTime(
            new Date(createdAt || '')
          )}
        </Text>
      </Box>
    </Box>
  );
};

export {
  RetroInfo,
};
