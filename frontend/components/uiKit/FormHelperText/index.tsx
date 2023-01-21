import React from 'react';
import styled from 'styled-components';
import { variant as variantFunc } from 'styled-system';

import { Text, TTextProps } from '@components/uiKit/Text';

type TVariant = 'default' | 'positive' | 'negative';

type TStyledTextProps = TTextProps & {
  variant: TVariant
}

const StyledText = styled(Text)<TStyledTextProps>`
${variantFunc({
    variants: {
      default: {
        color: 'font.normal',
      },
      positive: {
        color: 'font.positive',
      },
      negative: {
        color: 'font.negative',
      },
    },
  })}
`;

export type TFormHelperTextProps = Partial<TTextProps> & {
  children: React.ReactNode;
  variant?: TVariant,
}

const FormHelperText = (props: TFormHelperTextProps): React.ReactElement | null => {
  const {
    variant = 'default',
    children,
    ...other
  } = props;

  if (!children) {
    return null;
  }

  return (
    <StyledText
      variant={variant}
      fontSize={2}
      fontWeight={1}
      mt={2}
      {...other}
    >
      {children}
    </StyledText>
  );
};

export {
  FormHelperText,
};
