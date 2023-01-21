import { createGlobalStyle } from 'styled-components';

import { stylesMixins } from './mixins';

const GlobalStyle = createGlobalStyle`
  ${stylesMixins.reset};

  :root {
    --viewHeight: calc(100 * var(--vh, 1vh));
    --scrollbarWidth: calc(100vw - 100%);
  }

  html {
    min-width: 320px;
    color: red;
    background-color: ${({ theme }) => theme.colors.surface.d_10};
  }

  body {
    display: flex;
    flex-flow: column;
    width: 100%;
    min-width: 320px;
    min-height: 100vh;
    min-height: var(--viewHeight);
    font-family: ${({ theme }) => theme.fontFamily[0]};
  }

  #__next {
    display: flex;
    flex-grow: 1;
    height: 100%;
    flex-flow: column;
    min-width: 320px;
  }

  fieldset {
    overflow: hidden;
  }

  textarea {
    overflow-y: auto;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }

  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  [data-tour-elem="right-arrow"]:focus,
  [data-tour-elem="left-arrow"]:focus {
    outline: none;
  }

  // space onboarding
  .spaceOnboardingHideNextBtn [data-tour-elem="right-arrow"] {
    display: none;
  }

  .spaceOnboardingHidePrevBtn [data-tour-elem="left-arrow"] {
    display: none;
  }
`;

export {
  GlobalStyle,
};
