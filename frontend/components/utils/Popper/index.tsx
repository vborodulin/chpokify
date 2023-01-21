import { isServer } from '@chpokify/helpers';
import { Options as PopperOptions } from '@popperjs/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper as usePopperJS } from 'react-popper';
import { useSelector } from 'react-redux';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Fade } from '@components/uiKit/transitions/Fade';

import { useEventListener } from '@components/utils/hooks/useEventListener';
import { useMakeOnEscape } from '@components/utils/hooks/useMakeOnEscape';

import { detect } from '@lib/detect';

const TRANSITION_DURATION = 150;

export enum POPPER_MODE {
  CLICK = 'click',
  HOVER = 'hover'
}

export type TPopperProps = {
  id: string;
  targetElement: HTMLElement | null;
  mode?: POPPER_MODE;
  transition?: 'fade';
  isPortal?: boolean;
  children: React.ReactElement;
  options?: Partial<PopperOptions>;
};

const Popper = (props: TPopperProps): React.ReactElement | null => {
  const {
    id,
    transition,
    mode = POPPER_MODE.CLICK,
    targetElement,
    isPortal = true,
    children,
    options,
  } = props;

  const dispatch = useAppDispatch();

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const isOpen = useSelector(uiSelectors.getPopperIsOpen)(id);

  const isTouchEnabled = detect.getIsTouchEnabled();

  const { styles, attributes } = usePopperJS(
    targetElement,
    popperElement,
    options
  );

  const handleOpen = () => {
    dispatch(uiActions.popperOpen(id));
  };

  const handleClose = () => {
    dispatch(uiActions.popperHide(id));
  };

  const handleCloseAll = () => {
    dispatch(uiActions.popperHideAll());
  };

  const handleToggle = () => {
    if (isOpen) {
      dispatch(uiActions.popperHide(id));
    } else {
      dispatch(uiActions.popperOpen(id));
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const targetEvent = event.target as HTMLElement;

    if (!targetEvent) {
      return;
    }

    if (targetElement && targetElement.contains(targetEvent)) {
      return;
    }

    if (popperElement && !popperElement.contains(targetEvent)) {
      handleClose();
    }
  };

  const handleMouseEnter = () => {
    handleOpen();
  };

  const handleMouseLeave = () => {
    handleClose();
  };

  useMakeOnEscape(handleCloseAll);

  useEventListener(
    isServer() ? null : document,
    'click',
    handleClickOutside
  );

  useEventListener(
    targetElement,
    'mouseenter',
    !isTouchEnabled && mode === POPPER_MODE.HOVER
      ? handleMouseEnter
      : null
  );

  useEventListener(
    targetElement,
    'mouseleave',
    !isTouchEnabled && mode === POPPER_MODE.HOVER
      ? handleMouseLeave
      : null
  );

  useEventListener(
    targetElement,
    'click',
    mode === POPPER_MODE.CLICK || (isTouchEnabled && mode === POPPER_MODE.HOVER)
      ? handleToggle
      : null
  );

  const renderContent = () => (
    React.cloneElement(
      children,
      {
        style: styles.popper,
        ref: setPopperElement,
        onClose: handleClose,
        ...attributes,
      }
    )
  );

  const renderWithTransition = () => {
    if (transition === 'fade') {
      return (
        <Fade
          in={isOpen}
          duration={TRANSITION_DURATION}
        >
          {renderContent()}
        </Fade>
      );
    }

    if (isOpen) {
      return renderContent();
    }

    return null;
  };

  if (isServer()) {
    return null;
  }

  if (isPortal) {
    return (
      ReactDOM.createPortal(
        renderWithTransition(),
        document.body
      )
    );
  }

  return renderWithTransition();
};

export {
  Popper,
};
