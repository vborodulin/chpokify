import { useTranslation } from 'next-i18next';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import {
  SideBarItem,
  SideBarItemAdornment,
  SideBarItemText,
  TSideBarItemProps,
} from '@components/domains/space/SpaceSideBar/SideBarItem';

import { IconCrossSmall } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TSideBarCloseProps = Partial<TSideBarItemProps>;

const SideBarClose = (props: TSideBarCloseProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(uiActions.spaceSideBarClose());
  };

  return (
    <SideBarItem
      py={0}
      height="40px"
      onClick={handleClick}
      {...other}
    >
      <SideBarItemAdornment>
        <IconCrossSmall
          fill="font.d_30"
        />
      </SideBarItemAdornment>

      <SideBarItemText
        color="font.d_30"
      >
        {t('sideBarClose.title')}
      </SideBarItemText>
    </SideBarItem>
  );
};

export {
  SideBarClose,
};
