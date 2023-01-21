import { useTranslation } from 'next-i18next';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { retroSessionsRelationsRepo } from '@Redux/domains/retroSessionsRelationsRepo/selectors';

import { RetroSessionCreateCardBtn } from '@components/domains/retro/buttons/RetroSessionCreateCardBtn';
import { TRetroSessionCardProps } from '@components/domains/retro/RetroSession/RetroSessionCard';
import { TRetroSessionCardActionProps } from '@components/domains/retro/RetroSession/RetroSessionCardAction';
import { RetroSessionCreateCard } from '@components/domains/retro/RetroSession/RetroSessionCreateCard';
import { TYPE_DRAG_DROP } from '@components/domains/retro/RetroSession/types';

import { TBoxProps } from '@components/uiKit/Box';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TRetroSessionCardsProps = TFlexProps & {
  columnId: string,
  isColumnAction: boolean,
  popperTopCreateCardId?: string,
  cardProps?: TBoxProps,
  RetroCard: React.FunctionComponent<TRetroSessionCardActionProps | TRetroSessionCardProps>;
};

const RetroSessionCards = (props: TRetroSessionCardsProps): React.ReactElement | null => {
  const {
    columnId,
    cardProps,
    popperTopCreateCardId,
    isColumnAction,
    RetroCard,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const popperId = `retroSessionCreateCardBtn-${columnId}}`;
  const cardsIds = useSelector(retroSessionsRelationsRepo.getCardsIdsBySortVotesCount)(columnId);

  const renderInfoTxtToActionColumn = () => {
    if (!isColumnAction || cardsIds.length) {
      return null;
    }

    return (
      <Text
        fontSize={2}
        mb={2}
      >
        {t('pages.retro.retroColumnActions.emptyCards')}
      </Text>
    );
  };

  return (
    <Droppable
      droppableId={columnId}
      type={TYPE_DRAG_DROP.card}
      isCombineEnabled={!isColumnAction}
    >
      {
        (provided) => (
          <Flex
            ref={provided.innerRef}
            height="100%"
            flexGrow={1}
            alignContent="flex-start"
            flexDirection="column"
            mb={16}
            gap={2}
            {...provided.droppableProps}
            {...other}
          >
            {
              renderInfoTxtToActionColumn()
            }
            <RetroSessionCreateCard
              columnId={columnId}
              popperId={popperTopCreateCardId as string}
              isTopCreateCard
            />
            {
              cardsIds.map((cardId, idx) => (
                <RetroCard
                  key={cardId.toString()}
                  cardId={cardId.toString()}
                  index={idx}
                  columnId={columnId}
                  {...cardProps}
                />
              ))
            }
            {provided.placeholder}
            <RetroSessionCreateCard
              columnId={columnId}
              popperId={popperId}
              isColumnAction={isColumnAction}
            />
            <RetroSessionCreateCardBtn
              popperId={popperId}
              isColumnAction={isColumnAction}
            />

          </Flex>
        )
      }
    </Droppable>
  );
};

export {
  RetroSessionCards,
};
