import React from 'react';
import styled from 'styled-components';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconAdd } from '@components/uiKit/Icons';

const Root = styled(Flex)<TFlexProps>`
  border: 1px dashed ${({ theme }) => theme.colors.base.a_60};
  bottom: 0;
  cursor: pointer;
  height: calc(100vh - 170px);
  padding:8px;
  position: sticky;
  right: 0;
  top: 0;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.a_30};
    border: none;
  }
`;

export type TRetroSessionColumnAddBtnProps = TFlexProps & {
  canModerate: boolean
};

const RetroSessionColumnAddBtn = (props: TRetroSessionColumnAddBtnProps): React.ReactElement | null => {
  const {
    canModerate,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleAddColumn = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_COLUMN_ADD));
  };

  if (!canModerate) {
    return null;
  }

  return (
    <Root
      role="button"
      alignItems="center"
      justifyContent="center"
      borderRadius={2}
      minWidth="40px"
      maxWidth="40px"
      onClick={handleAddColumn}
      {...other}
    >
      <IconAdd
        opacity={0.8}
        mr={1}
      />
    </Root>
  );
};

export {
  RetroSessionColumnAddBtn,
};
