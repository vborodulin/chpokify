import { isServer } from '@chpokify/helpers';
import { useTranslation } from 'next-i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { videoCallActions } from '@Redux/domains/videoCall/actions';
import { videoCallSelectors } from '@Redux/domains/videoCall/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Jitsi } from '@components/domains/player/Jitsi';

import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { IconMinimize } from '@components/uiKit/Icons';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TPokerVideoCallProps = Partial<TPaperProps>;

export const Root = styled(Paper)<TPaperProps>`
  bottom: 0;
  box-shadow: ${({ theme }) => theme.shadows.popover};
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: unset;
    height: 460px;
    left: unset;
    right: ${({ theme }) => theme.space[2]};
    top: ${({ theme }) => theme.space[2]};
    width: 548px;
    z-index: 1;
  }
`;

const OPEN_TIMEOUT = 250;
const WIDTH = 548;

const defaultStyle = {
  transition: `transform ${OPEN_TIMEOUT}ms ease-in-out`,
  transform: `translate3d(${WIDTH + 100}px, 0, 0)`,
};

const transitionStyles: Record<string, React.CSSProperties> = {
  entering: {
    transform: 'translate3d(0, 0, 0)',
  },
  entered: {
    transform: 'translate3d(0, 0, 0)',
  },
  exiting: {
    transform: `translate3d(${WIDTH + 100}px, 0, 0)`,
  },
  exited: {
    transform: `translate3d(${WIDTH + 100}px, 0, 0)`,
  },
};

const PokerVideoCall = (props: TPokerVideoCallProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currUser = useSelector(authSelectors.getCurrUser);
  const currPokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const isOpen = useSelector(pokerSessionsSelectors.getIsVideoCallOpen);
  const isJoined = useSelector(videoCallSelectors.getIsJoined);

  const handleMinimize = () => {
    dispatch(pokerSessionsActions.isVideoCallOpenSet(false));
  };

  const handleLeave = () => {
    dispatch(videoCallActions.leave());
  };

  const handleJoin = () => {
    dispatch(videoCallActions.join());
  };

  const handleLeaveAndMinimize = () => {
    handleLeave();
    handleMinimize();
  };

  if (!currUser || !currPokerSessionId) {
    return null;
  }

  const renderContent = (state: string) => (
    <Root
      variant="card"
      borderRadius={[
        0,
        3,
      ]}
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
      {...other}
    >
      <PaperHeader>
        <Grid
          gridTemplateColumns="1fr auto"
          gridGap={3}
        >
          <Text
            as="h3"
            fontSize={6}
            fontWeight={1}
          >
            {t('pokerVideoCall.title')}
          </Text>

          <Button
            StartIcon={IconMinimize}
            onClick={handleMinimize}
          />
        </Grid>
      </PaperHeader>

      <PaperContent
        overflow="hidden"
        marginLeft={[
          -4,
          -6,
        ]}
        marginRight={[
          -4,
          -6,
        ]}
        marginBottom={[
          -4,
          -6,
        ]}
      >
        {
          (isOpen || isJoined) && (
            <Jitsi
              roomId={currPokerSessionId.toString()}
              participant={currUser}
              onLeave={handleLeaveAndMinimize}
              onJoin={handleJoin}
            />
          )
        }
      </PaperContent>
    </Root>
  );

  const renderWithTransition = () => (
    <Transition
      in={isOpen}
      timeout={OPEN_TIMEOUT}
    >
      {renderContent}
    </Transition>
  );

  if (isServer()) {
    return null;
  }

  return ReactDOM.createPortal(
    renderWithTransition(),
    document.body
  );
};

export {
  PokerVideoCall,
};
