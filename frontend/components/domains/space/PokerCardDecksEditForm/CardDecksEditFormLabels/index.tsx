import React from 'react';

import { Grid } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

type CardDecksEditFormLabelsProps = {
  label: string;
  value: string
};

const CardDecksEditFormLabels = (props: CardDecksEditFormLabelsProps): React.ReactElement | null => {
  const {
    label,
    value,
  } = props;

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      mb={4}
    >
      <Text
        color="font.d_30"
        fontSize={1}
        textTransform="upperCase"
      >
        {label}
      </Text>
      <Text
        color="font.d_30"
        fontSize={1}
        textTransform="upperCase"
      >
        {value}
      </Text>
    </Grid>
  );
};

export { CardDecksEditFormLabels };
