import { css } from 'styled-components';

import { reset } from './reset';

const smoothTransition = (
  transitionProperty: string = 'all'
) => css`transition: ${transitionProperty} 0.2s ease;`;

const hideElement = () => css`
display: none;
`;

const absoluteStretch = () => css`
bottom: 0;
left: 0;
position: absolute;
right: 0;
top: 0;
`;

const textEllipsis = () => css`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

const textLinesEllipsis = (lines: number) => css`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
  display: -webkit-box;
`;

export const stylesMixins = {
  reset,
  smoothTransition,
  hideElement,
  absoluteStretch,
  textEllipsis,
  textLinesEllipsis,
};
