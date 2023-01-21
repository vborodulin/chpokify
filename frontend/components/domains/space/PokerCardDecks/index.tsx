import { arrayHelpers } from '@chpokify/helpers';
import { TPokerCardDeck } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { CardDecksItem } from '@components/domains/space/PokerCardDecks/CardDecksItem';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { IconAdd } from '@components/uiKit/Icons';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TCards = {
  cardDecks: TPokerCardDeck[],
  title: string,
  isEdit?: boolean,
  cssBox?: Partial<TBoxProps>
}

const PokerCardDecks = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const pokerCardDecks = useSelector(pokerCardDecksSelectors.getCardDecksList);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const cardDecksDefault = pokerCardDecks.filter((el) => el.default);
  const cardDecksCustom = pokerCardDecks.filter((el) => !el.default);

  const handleOpenCreateModal = () => {
    if (!canModerate) return;

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_CARD_DECKS_CREATE));
  };

  const handleOpenEditModal = (cardDeckId: string) => {
    if (!canModerate) return;
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_CARD_DECKS_EDIT, {
      cardDeckId,
    }));
  };

  const renderCards = (props: TCards) => {
    const {
      cardDecks,
      title,
      cssBox,
      isEdit,
    } = props;
    if (arrayHelpers.isEmptyArr(cardDecks)) return null;

    return (
      <Box
        {...cssBox}
      >
        <Text
          color="font.d_30"
          fontSize={1}
          textTransform="upperCase"
        >
          {title}
        </Text>

        <Grid
          mt={4}
          gridTemplateColumns="1fr 1fr"
          gridGap={4}
        >
          {
            cardDecks.map((cardDeck) => {
              const cardDeckTitle = cardDeck.title;
              const _id = cardDeck._id.toString();
              return (
                <CardDecksItem
                  key={_id}
                  isHover={isEdit}
                  title={cardDeckTitle}
                  cards={cardDeck.cards}
                  onClick={() => isEdit && handleOpenEditModal(_id)}
                />
              );
            })
          }
        </Grid>
      </Box>
    );
  };

  const renderContent = () => (
    <PaperContent>
      {renderCards({
        cardDecks: cardDecksDefault,
        title: t('cardDecks.defaultDecks'),
      })}
      {renderCards({
        isEdit: true,
        cardDecks: cardDecksCustom,
        title: t('cardDecks.customDecks'),
        cssBox: {
          mt: 6,
        },
      })}
    </PaperContent>
  );
  const renderHeader = () => (
    <PaperHeader>
      {t('cardDecks.title')}
    </PaperHeader>
  );

  const renderFooter = () => (
    <PaperFooter>
      <Box>
        <Button
          StartIcon={IconAdd}
          variant="primary-outline"
          onClick={handleOpenCreateModal}
        >
          {t('cardDecks.createCustomDecksBtn')}
        </Button>
      </Box>
    </PaperFooter>
  );

  return (
    <Paper
      variant="card"
    >
      {renderHeader()}
      {renderContent()}
      {canModerate && renderFooter()}
    </Paper>
  );
};

export { PokerCardDecks };
