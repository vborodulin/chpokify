import { isServer } from '@chpokify/helpers';
import { domHelpers } from '@chpokify/helpers/dom';
import { transparentize } from 'polished';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

const Root = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => transparentize(0.1, theme.colors.surface.d_20)};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
`;

type TModalContainerProps = TBoxProps & {
  isOpen: boolean;
  preventClose: boolean;
  children?: React.ReactElement | null;
  preventBodyShift?: boolean;
};

const ModalContainer = (props: TModalContainerProps): React.ReactElement | null => {
  const {
    isOpen,
    preventClose,
    children,
    preventBodyShift = true,
    ...other
  } = props;

  const rootRef = useRef<HTMLElement>();
  const scrollBarWidthRef = useRef<number>(0);
  const initPaddingRightPXRef = useRef<number>(0);
  const IsScrollLockedRef = useRef<boolean>(false);

  const getBodyHasScroll = () => {
    const { scrollingElement } = document;
    return scrollingElement && scrollingElement.scrollHeight > scrollingElement.clientHeight;
  };

  const preventBodyShiftEnable = () => {
    const nextContainer = document.getElementById('__next');

    if (!nextContainer || !preventBodyShift) {
      return;
    }

    scrollBarWidthRef.current = window.innerWidth - document.body.clientWidth;

    if (getBodyHasScroll()) {
      nextContainer.style.marginRight = `${scrollBarWidthRef.current}px`;

      if (rootRef.current) {
        const computedStyle = window.getComputedStyle(rootRef.current, null);
        const paddingRight = computedStyle.getPropertyValue('padding-right');
        const paddingRightNum = Number.parseInt(paddingRight, 10);
        initPaddingRightPXRef.current = paddingRightNum;

        rootRef.current.style.paddingRight = `${paddingRightNum + scrollBarWidthRef.current}px`;
      }
    }
  };

  const preventBodyShiftDisable = () => {
    const nextContainer = document.getElementById('__next');

    if (!nextContainer || !preventBodyShift) {
      return;
    }

    nextContainer.style.marginRight = 'unset';

    if (rootRef.current) {
      rootRef.current.style.paddingRight = `${initPaddingRightPXRef.current}px`;
    }
  };

  const handleAfterOpen = () => {
    if (domHelpers.getIsBodyScrollLocked()) {
      return;
    }

    IsScrollLockedRef.current = true;
    preventBodyShiftEnable();
    domHelpers.preventBodyScrollEnable();
  };

  const handleAfterClose = () => {
    if (!IsScrollLockedRef.current) {
      return;
    }

    IsScrollLockedRef.current = false;
    preventBodyShiftDisable();
    domHelpers.preventBodyScrollDisable();
  };

  const renderContent = () => {
    if (isOpen) {
      return (
        <Root
          ref={rootRef}
          pt={preventClose ? [3, null, 6] : 12}
          pb={preventClose ? [3, null, 6] : 4}
          px={[3, null, 6]}
          {...other}
        >
          {children}
        </Root>
      );
    }

    return null;
  };

  useEffect(() => {
    if (isOpen) {
      handleAfterOpen();
    } else {
      handleAfterClose();
    }
  }, [isOpen]);

  if (isServer()) {
    return null;
  }

  return ReactDOM.createPortal(
    renderContent(),
    document.body
  );
};

export {
  ModalContainer,
};
