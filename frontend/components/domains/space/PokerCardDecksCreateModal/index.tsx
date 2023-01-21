import { POKER_CARD_DECK_TYPE, TPokerCard, TPokerCardDeck } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { pokerCardDecksActionTypes } from '@Redux/domains/pokerCardDecks/actionTypes';
import { pokerCardDecksAsyncActions } from '@Redux/domains/pokerCardDecks/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';
import { CardDecksEditForm } from '@components/domains/space/PokerCardDecksEditForm';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

const FORM_ID = 'CardDecksCreateModal';

export type TFormData = {
  title: string,
  cards: Record<string, any>,
}

type TCardDecksCreateModalProps = {
  onClose: () => void;
}

export type TSelectCarDecOption = TPokerCard & {
  type: POKER_CARD_DECK_TYPE;
  hasBtnRemove?: boolean;
  icon?: string;
  name?: string;
  focus?: boolean;
}

export const CARD_DECKS_DEFAULT_OPTIONS: TPokerCard[] = [
  {
    _id: shortid(),
    name: '?',
    value: null,
    type: POKER_CARD_DECK_TYPE.TEXT,
    default: true,
  },
  {
    _id: shortid(),
    icon: 'IconCoffee',
    value: null,
    type: POKER_CARD_DECK_TYPE.ICON,
    default: true,
  },
];
export const CARD_DECKS_INITIAL_OPTIONS: TSelectCarDecOption[] = [
  {
    _id: shortid(),
    name: '',
    value: null,
    type: POKER_CARD_DECK_TYPE.TEXT,
  },
  {
    _id: shortid(),
    name: '',
    value: null,
    type: POKER_CARD_DECK_TYPE.TEXT,
  },
];

const PokerCardDecksCreateModal = (props: TCardDecksCreateModalProps): React.ReactElement | null => {
  const { onClose } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [cardDecks, setCardDecks] = useState(CARD_DECKS_INITIAL_OPTIONS);

  const {
    register,
    handleSubmit,
    setError,
    errors,
    setValue,
    formState: {
      dirtyFields,
    },
  } = useForm<TFormData>();

  const dispatch = useAppDispatch();

  const [targetElement, setTargetElement] = useState<any>();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const popperIdRef = useRef(`createCardDeck-${shortid()}`);

  const disabledBtnSubmit = ((dirtyFields.size - 1) / 2) !== cardDecks.length;

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerCardDecksActionTypes.CREATE_PENDING],
    ['title', 'cards'],
    setError
  );

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

  const handleRemoveCardDeck = (idx: number, _id: string) => {
    const cardsName = `cards[${_id}]name`;
    const cardsValue = `cards[${_id}]value`;
    dirtyFields.delete(cardsName);
    dirtyFields.delete(cardsValue);

    let newValue = cardDecks.filter((el, id) => id !== idx);

    if (newValue.length <= 2) {
      newValue = newValue.map((item) => ({
        ...item,
        hasBtnRemove: false,
      }));
    }

    setCardDecks(newValue);
  };

  const enhanceData = (dataRaw: TFormData) => {
    const {
      title,
      cards: cardsLocal,
    } = dataRaw;

    const cards = Object.values(cardsLocal)
      .concat(CARD_DECKS_DEFAULT_OPTIONS)
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

  const onSubmit = async (data: TFormData) => {
    const sendData = enhanceData(data) as TPokerCardDeck;

    const { payload } = await dispatch(
      pokerCardDecksAsyncActions.create(currSpaceId, sendData)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  const renderTooltip = () => {
    if (!disabledBtnSubmit) {
      return null;
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'top',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {t('cardDecks.createModal.tooltip')}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  const renderHeader = () => (
    <PaperHeader
      mb={6}
    >
      {t('cardDecks.createModal.title')}
    </PaperHeader>
  );

  const renderContent = () => (
    <PaperContent>
      <CardDecksEditForm
        setValue={setValue}
        errors={errors}
        register={register}
        cardDecks={cardDecks}
        cardDecksDefault={CARD_DECKS_DEFAULT_OPTIONS}
        handleAddCardDeck={handleAddCardDeck}
        handleRemoveCardDeck={handleRemoveCardDeck}
        formId={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
      />
      <FormHelperText
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>
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
      <PaperActions>
        <Button
          onClick={onClose}
        >
          {t('cardDecks.createModal.cancelBtn')}
        </Button>

        <Box
          ref={setTargetElement}
        >
          <Button
            disabled={disabledBtnSubmit}
            variant="primary"
            type="submit"
            form={FORM_ID}
            onClick={handleSubmit(onSubmit)}
          >
            {t('cardDecks.createModal.createBtn')}
          </Button>
        </Box>
        {renderTooltip()}
      </PaperActions>
    </PaperFooter>
  );

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

export { PokerCardDecksCreateModal };
