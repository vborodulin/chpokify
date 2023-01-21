import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';

import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconChevronDown, IconChevronUp } from '@components/uiKit/Icons';

export type TRetroSessionItemActionsBtnProps = Partial<TIconButtonProps> & {
  retroSessionId: string;
  isOpen: boolean;
  onClick: () => void;
};

const RetroSessionItemActionsBtn = (props: TRetroSessionItemActionsBtnProps): React.ReactElement | null => {
  const {
    isOpen,
    retroSessionId,
    onClick,
    ...other
  } = props;

  const countCardsFromActionColumn = useSelector(
    retroSessionRepoSelectors.getCountCardsFromActionColumnByRetroSessionId
  )(retroSessionId);

  const renderIconBtn = () => {
    if (isOpen) {
      return (
        <IconChevronUp />
      );
    }

    return (
      <IconChevronDown />
    );
  };

  if (!countCardsFromActionColumn) {
    return null;
  }

  return (
    <IconButton
      variant="contained"
      onClick={onClick}
      isHover
      {...other}
    >
      {
        renderIconBtn()
      }
    </IconButton>
  );
};

export {
  RetroSessionItemActionsBtn,
};
