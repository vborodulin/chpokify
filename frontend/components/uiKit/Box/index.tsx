import React from 'react';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  system,
  BoxShadowProps,
} from 'styled-system';

export type TBoxProps =
  SpaceProps &
  LayoutProps &
  ColorProps &
  BorderProps &
  BoxShadowProps &
  {
    disabled?: boolean;
    flexGrow?: number | any[];
    flexShrink?: number | any[];
    order?: number | any[];
    zIndex?: number;
  }
  & Omit<React.FormHTMLAttributes<any>, 'defaultValue'> & Record<string, any>;

const Box = styled.div<TBoxProps>`
  box-sizing: border-box;
  min-width: 0;
  ${compose(space, color, layout, border)};
  ${system({
    justifyContent: {
      property: 'justifyContent',
    },
  })};
  ${system({
    flexGrow: {
      property: 'flexGrow',
    },
  })};
  ${system({
    alignItems: {
      property: 'alignItems',
    },
  })};
  ${system({
    flexShrink: {
      property: 'flexShrink',
    },
  })}
  ${system({
    gap: {
      property: 'gap',
      scale: 'gap',
    },
  })}
  ${system({
    order: {
      property: 'order',
    },
  })}
  ${system({
    visibility: {
      property: 'visibility',
    },
  })}
  ${system({
    position: {
      property: 'position',
    },
  })}
  ${system({
    left: {
      property: 'left',
    },
  })}
  ${system({
    right: {
      property: 'right',
    },
  })}
  ${system({
    top: {
      property: 'top',
    },
  })}
  ${system({
    bottom: {
      property: 'bottom',
    },
  })}
  ${system({
    zIndex: {
      property: 'zIndex',
    },
  })}
  ${system({
    pointerEvents: {
      property: 'pointerEvents',
    },
  })}
  ${system({
    cursor: {
      property: 'cursor',
    },
  })}
  ${system({
    boxShadow: {
      property: 'boxShadow',
      scale: 'shadows',
    },
  })}
  ${system({
    float: {
      property: 'float',
    },
  })}
`;

export {
  Box,
};
