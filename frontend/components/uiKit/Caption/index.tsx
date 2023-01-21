import React from 'react';
import { css } from 'styled-components';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TCaptionProps = TTextProps;

const Caption = (props: TCaptionProps): React.ReactElement | null => (
  <Text
    fontSize={0}
    color="font.d_30"
    css={css`text-transform: uppercase; white-space: nowrap`}
    {...props}
  />
);

export {
  Caption,
};
