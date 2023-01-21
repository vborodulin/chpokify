import { arrayHelpers } from '@chpokify/helpers';
import { POKER_CARD_DECK_TYPE, TPokerCardDeck } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { pokerCardDecksActionTypes } from '@Redux/domains/pokerCardDecks/actionTypes';
import { pokerCardDecksAsyncActions } from '@Redux/domains/pokerCardDecks/asyncActions';
import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';
import { TFormData, TSelectCarDecOption } from '@components/domains/space/PokerCardDecksCreateModal';
import { CardDecksEditForm } from '@components/domains/space/PokerCardDecksEditForm';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Grid } from '@components/uiKit/Grid';
import { IconDelete } from '@components/uiKit/Icons';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

const FORM_ID = 'CardDecksEditModal';
type TCardDecksEditModalProps = {
  onClose: () => void;
  cardDeckId: string;
}

const PokerCardDecksEditModal = (props: TCardDecksEditModalProps): React.ReactElement | null => {
  const {
    onClose,
    cardDeckId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const cardDeck = useSelector(pokerCardDecksSelectors.getCardDeckById)(cardDeckId);

  if (!cardDeck) {
    log.error(new ClientError(`cardSet not found for id:${cardDeckId}`));
    return null;
  }

  const cardDecksDefault = cardDeck?.cards.filter((el) => el.default) as TSelectCarDecOption[];
  let cardDecksNotDefault = cardDeck?.cards.filter((el) => !el.default) as TSelectCarDecOption[];

  if (!arrayHelpers.isEmptyArr(cardDecksNotDefault) && cardDecksNotDefault.length > 2) {
    cardDecksNotDefault = cardDecksNotDefault.map((item) => ({
      ...item,
      hasBtnRemove: true,
    }));
  }

  const [cardDecks, setCardDecks] = useState(cardDecksNotDefault || []);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    errors,
    watch,
    formState: {
      dirty,
    },
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerCardDecksActionTypes.UPDATE_PENDING],
    ['title', 'cards'],
    setError
  );

  const watchCards = watch('cards');
  const disabledBtnSubmit = !dirty && !watchCards;

  const enhanceData = (dataRaw: TFormData) => {
    const {
      title,
      cards: cardsLocal,
    } = dataRaw;

    const cards = Object.values(cardsLocal)
      .concat(cardDecksDefault)
      .map((item, idx) => ({
        ...item,
        _id: idx.toString(),
        type: !item.type ? POKER_CARD_DECK_TYPE.TEXT : item.type,
        value: item.value ? +item.value : item.value,
      }));

    return {
      title,
      cards,
    };
  };

  const handleAddCardDeck = () => {
    const newValue = cardDecks.map((item) => {
      if (!item.default) {
        return {
          ...item,
          hasBtnRemove: true,
        };
      }

      return item;
    });

    setCardDecks([...newValue, {
      _id: shortid(),
      name: '',
      value: null,
      hasBtnRemove: true,
      type: POKER_CARD_DECK_TYPE.TEXT,
      focus: true,
    }]);
  };

  const handleRemoveCardDeck = (idx: number) => {
    let newValue = cardDecks.filter((el, id) => id !== idx);

    if (newValue.length <= 2) {
      newValue = newValue.map((item) => ({
        ...item,
        hasBtnRemove: false,
      }));
    }

    setCardDecks(newValue);
  };

  const onDelete = async () => {
    if (!cardDeck?._id) return;

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_CARD_DECK_REMOVE, {
      cardDeckId: cardDeck._id,
      spaceId: currSpaceId,
    }));
  };

  const onSubmit = async (data: TFormData) => {
    if (!cardDeck?._id) return;

    const sendData = enhanceData(data) as TPokerCardDeck;

    const { payload } = await dispatch(
      pokerCardDecksAsyncActions.update(cardDeck._id, currSpaceId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  const renderContent = () => (
    <PaperContent>
      <CardDecksEditForm
        setValue={setValue}
        errors={errors}
        register={register}
        cardDecks={cardDecks}
        cardDecksDefault={cardDecksDefault}
        handleAddCardDeck={handleAddCardDeck}
        handleRemoveCardDeck={handleRemoveCardDeck}
        formId={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        defaultValue={{
          title: cardDeck?.title,
        }}
      />
    </PaperContent>
  );
  const renderFooter = () => (
    <PaperFooter>
      <Divider
        mb={6}
      />
      <FormHelperText
        mb={4}
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>
      <Grid
        justifyContent="space-between"
        gridGap={4}
        gridAutoFlow="column"
      >
        <Button
          StartIcon={IconDelete}
          onClick={onDelete}
        />
        <Flex
          gap={4}
        >
          <Button
            onClick={onClose}
          >
            {t('cardDecks.editModal.cancelBtn')}
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            form={FORM_ID}
            disabled={disabledBtnSubmit}
          >
            {t('cardDecks.editModal.saveBtn')}
          </Button>
        </Flex>
      </Grid>
    </PaperFooter>
  );
  const renderHeader = () => (
    <PaperHeader
      mb={6}
    >
      {t('cardDecks.editModal.title')}
    </PaperHeader>

  );
  if (!cardDeck) return null;
  return (
    <Modal
      maxWidth="700px"
      onClose={onClose}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </Modal>
  );
};

export { PokerCardDecksEditModal };
