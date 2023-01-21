import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { uiSelectors } from '@Redux/domains/ui/selectors';

import { Box, TBoxProps } from '@components/uiKit/Box';

import { usePreventBodyScroll } from '@components/utils/hooks/usePreventBodyScroll';

export type TMobileOverlayProps = Partial<TBoxProps>;

const StyledRoot = styled(Box)<TBoxProps>`
`;

const MobileOverlay = (props: TMobileOverlayProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const rootRef = useRef<any>();

  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  usePreventBodyScroll(isSideBarOpen);

  return (
    <StyledRoot
      ref={rootRef.current}
      className="mobile-overlay"
      display={[
        isSideBarOpen ? 'block' : 'none',
        'none',
      ]}
      position="fixed"
      top="0px"
      left="0px"
      right="0px"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.3)"
      overflow="visible"
      userSelect="none"
      pointerEvents="unset"
      {...other}
    />
  );
};

export {
  MobileOverlay,
};
