import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconAdd } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = TFlexProps & {
  onAddColumn: () => void;
};

const Root = styled(Flex)<TFlexProps>`
  border: 1px dashed ${({ theme }) => theme.colors.base.a_60};
  cursor: pointer;
  padding:8px;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.a_30};
    border: none;
  }
`;

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    onAddColumn,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Root
      role="button"
      alignItems="center"
      justifyContent="center"
      borderRadius={2}
      maxWidth={['280px', '356px']}
      minWidth={['280px', '356px']}
      onClick={onAddColumn}
      {...other}
    >
      <IconAdd
        opacity={0.8}
        mr={1}
      />
      <Text
        fontSize={2}
        fontWeight={1}
        opacity={0.8}
      >
        {t('kanbanColumnAdd.title')}
      </Text>
    </Root>
  );
};

export {
  Layout,
};
