import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionEnableVotingBtn } from '@components/domains/retro/buttons/RetroSessionEnableVotingBtn';
import { RetroSessionHiddenCardsBtn } from '@components/domains/retro/buttons/RetroSessionHiddenCardsBtn';
import { RetroSessionSettingsBtn } from '@components/domains/retro/buttons/RetroSessionSettingsBtn';

import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { Paper, TPaperProps } from '@components/uiKit/Paper';

export const WIDTH_SETTINGS_SIDEBAR = 340;

const Root = styled(Paper)<TPaperProps>`
  align-self: center;
  bottom: 36px;
  display:flex;
  left: 0;
  margin:0 auto;
  position: fixed;
  right:0;
  width: fit-content;
`;

const RetroSessionSettingsActions = (): React.ReactElement | null => {
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const renderDivider = () => (
    <Divider
      height="24px"
      width="1px"
      mx={[1, 2]}
    />
  );

  if (!canModerate) {
    return null;
  }

  return (
    <Root
      variant="modal"
      p={1}
    >
      <Flex
        alignItems="center"
      >
        <RetroSessionHiddenCardsBtn />
        {
          renderDivider()
        }
        <RetroSessionEnableVotingBtn />
        {
          renderDivider()
        }
        <RetroSessionSettingsBtn />
      </Flex>
    </Root>
  );
};

export {
  RetroSessionSettingsActions,
};
