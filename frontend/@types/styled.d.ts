import React from 'react';
import { CSSProp } from 'styled-components';

import { TTheme } from '@styles';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    forwardedAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  }
}
