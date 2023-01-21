import { isServer } from '@chpokify/helpers';
import { TPokerCardDeckScores, TStory } from '@chpokify/models-types';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { PokerScores, TPokerScoresProps } from '@components/domains/poker/PokerScores';
import { StoryMenu } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryMenu';
import { IconBtnWithMenu } from '@components/domains/shared/IconBtnWithMenu';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { useDidmount } from '@components/utils/hooks/useDidmount';
import { useEventListener } from '@components/utils/hooks/useEventListener';

import { detect } from '@lib/detect';

import { stylesMixins } from '@styles';

import { reactHelpers } from '@helpers/React';

export type TLayoutProps = Partial<TFlexProps> & {
  story: TStory;
  score: TPokerCardDeckScores;
  menuId: string;
  isSelected: boolean;
  isActive: boolean;
  isMenuOpen: boolean;
}

const Title = styled(Text)`
  ${stylesMixins.textLinesEllipsis(2)}
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledPokerScores = styled(PokerScores)<TPokerScoresProps>`
  flex-shrink: 0;
`;

type TRootProps = Partial<TFlexProps> & {
  isActive: boolean;
  isSelected: boolean;
};

const rootHoverMixin = css<TRootProps>`
  background-color: ${({ theme }) => theme.colors.primary.d_40};

  ${Title},
  ${StyledPokerScores} {
    color: ${({ theme }) => theme.colors.font.primary};
  }
`;

const rootSelectedMixin = css<TRootProps>`
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary.d_10};
  ${rootHoverMixin};
`;

const rootActiveMixin = css<TRootProps>`
  ${rootSelectedMixin};
  background-color: ${({ theme }) => theme.colors.primary.d_10};

  ${Title},
  ${StyledPokerScores} {
    color: ${({ theme }) => theme.colors.font.invert};
  }
`;

const Root = styled(Flex)<TRootProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor: grab;
  height: 52px;
  padding: 0 ${({ theme }) => theme.space[3]};
  user-select: none;

  &:hover {
    ${({ isSelected, isActive }) => !isSelected && !isActive && rootHoverMixin};
  }

  ${({ isSelected }) => (isSelected && rootSelectedMixin)};
  ${({ isActive }) => (isActive && rootActiveMixin)};
`;

const Layout = React.forwardRef<any, TLayoutProps>((props, ref) => {
  const {
    story,
    score,
    menuId,
    isMenuOpen,
    isActive,
    ...other
  } = props;

  const {
    title,
  } = story;

  const isTouchEnabled = detect.getIsTouchEnabled();
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const rootRef = useRef<any>();
  const [isHover, setIsHover] = useState<boolean>(false);

  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

  useDidmount(() => {
    if (isTouchEnabled) {
      return;
    }

    if (canModerate) {
      if (isMouseEnter) {
        setIsHover(true);
      } else if (!isMenuOpen) {
        setIsHover(false);
      }
    }
  }, [isMouseEnter, isMenuOpen, canModerate]);

  useEventListener(
    isServer() || isTouchEnabled || !canModerate ? null : rootRef.current,
    'mouseenter',
    handleMouseEnter
  );

  useEventListener(
    isServer() || isTouchEnabled || !canModerate ? null : rootRef.current,
    'mouseleave',
    handleMouseLeave
  );

  const renderMenuBtn = () => (
    <IconBtnWithMenu
      popperId={menuId}
      menu={(
        <StoryMenu
          story={story}
        />
      )}
      popperProps={{
        isPortal: false,
      }}
      isActive={isActive}
      isMenuOpen={isMenuOpen}
    />
  );

  const renderScore = () => {
    if (!isTouchEnabled && isHover && canModerate) {
      return renderMenuBtn();
    }

    return (
      <StyledPokerScores
        scores={score}
        fontSize={5}
        fontWeight={1}
        marginRight={3}
      />
    );
  };

  const renderTouchMenu = () => {
    if (isTouchEnabled) {
      return renderMenuBtn();
    }
  };

  return (
    <Root
      ref={reactHelpers.mergeRefs([rootRef, ref])}
      alignItems="center"
      justifyContent="space-between"
      isActive={isActive}
      {...other}
    >
      <Title
        fontSize={2}
        fontWeight={1}
        mr={[
          13,
          null,
          6,
        ]}
      >
        {title}
      </Title>

      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {renderScore()}
        {renderTouchMenu()}
      </Flex>
    </Root>
  );
});

Layout.displayName = 'Layout';

export {
  Layout,
};
