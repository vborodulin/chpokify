import React, { CSSProperties } from 'react';
import { Transition } from 'react-transition-group';

export type TFadeProps = {
  in: boolean;
  children: React.ReactElement;
  duration?: number;
};

const Fade = (props: TFadeProps) => {
  const {
    in: inProp,
    children,
    duration = 300,
  } = props;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease`,
    opacity: 0,
  };

  const transitionStyles: Record<string, CSSProperties> = {
    entering: { opacity: 0.01 },
    entered: { opacity: 1 },
    exiting: { opacity: 0.01 },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      in={inProp}
      mountOnEnter
      unmountOnExit
      timeout={duration}
    >
      {(state) => (
        React.cloneElement(
          children,
          {
            style: { ...children.props.style, ...defaultStyle, ...transitionStyles[state] },
          }
        ))}
    </Transition>
  );
};

export {
  Fade,
};
