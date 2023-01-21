import { TPokerCard } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import shortid from 'shortid';

import { CardVotedHide } from '@components/domains/poker/pokerCards/CardVotedHide';
import { CardVotedOpen } from '@components/domains/poker/pokerCards/CardVotedOpen';
import { CardVoting } from '@components/domains/poker/pokerCards/CardVoting';
import { Username } from '@components/domains/user/Username';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipDescription } from '@components/uiKit/TooltipDescription';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TBoxProps> & {
  isMe: boolean;
  card: TPokerCard | undefined;
  username: string;
  inSession: boolean;
  isTeamVoting: boolean;
}

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    isMe,
    card,
    username,
    inSession,
    isTeamVoting,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const popperIdRef = useRef(`popper-username-${shortid()}`);

  const [targetElement, setTargetElement] = useState<any>();

  const renderUsernamePopper = () => {
    if (inSession) {
      return null;
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        options={popperTooltipOptions}
        mode={POPPER_MODE.HOVER}
      >
        <Tooltip>
          <TooltipDescription>
            {t('pokerUserCard.userOffline')}
          </TooltipDescription>
        </Tooltip>
      </Popper>
    );
  };

  const renderCard = () => {
    if (isTeamVoting) {
      if (!card) {
        return (
          <CardVoting
            isMe={isMe}
          />
        );
      }

      return (
        <CardVotedHide
          isMe={isMe}
        />
      );
    }

    return (
      <CardVotedOpen
        px={3}
        isMe={isMe}
        card={card}
      />
    );
  };

  const renderUsername = () => (
    <Flex
      alignItems="center"
      justifyContent="center"
      mt={2}
    >
      <Username
        ref={setTargetElement}
        username={username}
        isOnline={inSession}
        hideYourBadge
        display="flex"
        fontSize={2}
        fontWeight={1}
        textAlign="center"
        flexGrow={0}
      />
    </Flex>
  );

  return (
    <Box
      opacity={inSession ? 1 : 0.4}
      {...other}
    >
      {renderCard()}
      {renderUsername()}
      {renderUsernamePopper()}
    </Box>
  );
};

export {
  Layout,
};
