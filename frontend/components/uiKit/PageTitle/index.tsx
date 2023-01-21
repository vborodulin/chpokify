import React from 'react';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TPageTitleProps = Partial<TTextProps>;

const PageTitle = (props: TPageTitleProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <Text
      as="h1"
      fontSize={[
        6,
        8,
      ]}
      fontWeight={1}
      my={[4, 6]}
      {...other}
    />
  );
};

export {
  PageTitle,
};
