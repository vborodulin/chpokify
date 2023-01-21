import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { persistOperations } from '@Redux/domains/persist/operations';
import { persistSelectors } from '@Redux/domains/persist/selectors';
import { useAppDispatch } from '@Redux/hooks';

import {
  SideBarItem,
  SideBarItemAdornment,
  SideBarItemText,
  TSideBarItemProps,
} from '@components/domains/space/SpaceSideBar/SideBarItem';
import { useTheme } from '@components/domains/user/hooks/useTheme';

import { IconCollapse, IconExpand } from '@components/uiKit/Icons';

import { useMediaQuery } from '@components/utils/hooks/useMediaQuery';
import { TRANS } from '@components/utils/types';

export type TSideBarCollapseProps = Partial<TSideBarItemProps>;

const SideBarCollapse = (props: TSideBarCollapseProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const isSideBarOpen = useSelector(persistSelectors.getIsSideBarUncollapsed);

  const isBreakpointLG = useMediaQuery(`(min-width: ${theme.breakpoints[2]})`);

  const handleClick = async () => {
    await dispatch(persistOperations.toggleSideBar(!isBreakpointLG));
  };

  const renderIcon = () => {
    if (!isSideBarOpen) {
      return (
        <IconExpand
          fill="font.d_30"
        />
      );
    }

    return (
      <IconCollapse
        fill="font.d_30"
      />
    );
  };

  return (
    <SideBarItem
      py={0}
      height="40px"
      onClick={handleClick}
      mb={0}
      {...other}
    >
      <SideBarItemAdornment>
        {renderIcon()}
      </SideBarItemAdornment>

      <SideBarItemText
        opacity={isSideBarOpen ? 1 : 0}
        color="font.d_30"
      >
        {t('sideBarCollapse.title')}
      </SideBarItemText>
    </SideBarItem>
  );
};

export {
  SideBarCollapse,
};
