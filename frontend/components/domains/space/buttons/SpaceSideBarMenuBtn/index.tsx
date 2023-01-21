import React from 'react';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';

import { persistOperations } from '@Redux/domains/persist/operations';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconMenu } from '@components/uiKit/Icons';

import { detect } from '@lib/detect';

export type TSpaceSideBarMenuBtnProps = Partial<TIconButtonProps>;

const SpaceSideBarMenuBtn = (props: TSpaceSideBarMenuBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const isSideBarOpen = useSelector(uiSelectors.getIsSpaceSideBarOpen);

  const handleClick = async (event: React.MouseEvent) => {
    const isMobile = detect.getIsMobile();

    if (isMobile) {
      event.nativeEvent.stopImmediatePropagation();
      dispatch(uiActions.popperHideAll());
      dispatch(uiActions.spaceSideBarToggle());
      return;
    }

    await dispatch(persistOperations.toggleSideBar());
  };

  if (!currSpaceId) {
    return null;
  }

  return (
    <IconButton
      isHover
      variant="contained"
      onClick={handleClick}
      {...other}
    >
      <IconMenu
        fill="font.normal"
        css={css`transform: rotate(${isSideBarOpen ? '90deg' : 0});`}
      />
    </IconButton>
  );
};

export {
  SpaceSideBarMenuBtn,
};
