import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TBoxArProps = Partial<TBoxProps> & {
  ar?: number
}

const Root = styled(Box)<TBoxProps>`
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ArSpacer = styled(Box)<TBoxProps & { ar: number }>`
padding-bottom: ${({ ar }) => 100 / ar}%;
`;

const Content = styled(Box)<TBoxProps>`
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  min-height: 100%;
  object-fit: cover;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;

const BoxAr = (props: TBoxArProps): React.ReactElement | null => {
  const {
    ar = 16 / 9,
    ...other
  } = props;

  return (
    <Root>
      <ArSpacer
        ar={ar}
      />

      <Content
        {...other}
      />
    </Root>
  );
};

export {
  BoxAr,
};
