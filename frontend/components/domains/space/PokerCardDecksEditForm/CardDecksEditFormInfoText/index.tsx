import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Text } from '@components/uiKit/Text';

type CardDecksEditFormLabelsProps = {
  text: string;
};

const CardDecksEditFormInfoText = (props: CardDecksEditFormLabelsProps): React.ReactElement | null => {
  const {
    text,
  } = props;

  return (
    <Box
      mb={6}
    >
      <Text
        fontSize={2}
      >
        {text}
      </Text>
    </Box>
  );
};

export { CardDecksEditFormInfoText };
