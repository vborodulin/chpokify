import { isServer } from '@chpokify/helpers';
import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { IconButton } from '@components/uiKit/IconButton';
import { IconCross } from '@components/uiKit/Icons';
import { Paper, TPaperProps } from '@components/uiKit/Paper';

import { useEventListener } from '@components/utils/hooks/useEventListener';

import { reactHelpers } from '@helpers/React';

export type TModalProps = Partial<TPaperProps> & {
  preventClose?: boolean;
  onClose?: () => void;
};

const StylesCloseBtn = styled(IconButton)``;

const Root = styled(Paper)<TPaperProps & { preventClose?: boolean }>`
display: flex;
flex-flow: column;
max-height: 100%;
overflow: visible;
position: relative;
width: 100%;
`;

const Modal = React.forwardRef<any, TModalProps>((props, ref) => {
  const {
    onClose,
    preventClose,
    closeBtnCss,
    children,
    ...other
  } = props;

  const rootRef = useRef<HTMLElement>(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleCloseOutside = () => {
    if (preventClose) {
      return;
    }

    handleClose();
  };

  const handleClickAway = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!rootRef.current || !target) {
      return;
    }

    if (!rootRef.current.contains(target)) {
      handleCloseOutside();
    }
  };

  const handleCloseOnEsc = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Esc': // IE/Edge specific value
      case 'Escape':
        handleCloseOutside();
        break;
      default:
    }
  };

  useEventListener(
    isServer() ? null : document,
    'mousedown',
    handleClickAway
  );

  useEventListener(
    isServer() ? null : window,
    'keydown',
    handleCloseOnEsc
  );

  useEffect(() => {
    Router.events.on('routeChangeStart', handleClose);

    return () => {
      Router.events.off('routeChangeStart', handleClose);
    };
  }, []);

  return (
    <Root
      ref={reactHelpers.mergeRefs([rootRef, ref])}
      variant="modal"
      preventClose={preventClose}
      maxWidth="400px"
      {...other}
    >
      {
        !preventClose && (
          <StylesCloseBtn
            onClick={handleClose}
            top="-48px"
            right="0"
            position="absolute"
            {...closeBtnCss}
          >
            <IconCross />
          </StylesCloseBtn>
        )
      }

      {children}
    </Root>
  );
});

Modal.displayName = 'ModalUiKit';

export { Modal };
