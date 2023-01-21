import { useTranslation } from 'next-i18next';
import React from 'react';

import { TFormData, TSelectCarDecOption } from '@components/domains/space/PokerCardDecksCreateModal';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { IconAdd } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

import { CardDecksEditFormContent } from './CardDecksEditFormContent';
import { CardDecksEditFormInfoText } from './CardDecksEditFormInfoText';
import { CardDecksEditFormLabels } from './CardDecksEditFormLabels';

export type TCardDecksEditFormProps = {
  cardDecks: TSelectCarDecOption[],
  cardDecksDefault: TSelectCarDecOption[],
  register: React.Ref<any>,
  handleAddCardDeck: () => void;
  onSubmit: () => void;
  setValue: (name:string, value:number) => void;
  formId: string,
  handleRemoveCardDeck: (idx: number, _id:string) => void;
  defaultValue?: Record<string, any>
  errors: TFormErrors<TFormData>;
}

const CardDecksEditForm = (props: TCardDecksEditFormProps): React.ReactElement | null => {
  const {
    register,
    cardDecks,
    cardDecksDefault,
    handleRemoveCardDeck,
    handleAddCardDeck,
    onSubmit,
    formId,
    defaultValue,
    errors,
    setValue,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Box
      id={formId}
      as="form"
      onSubmit={onSubmit}
    >
      <Box
        mb={6}
      >
        <FormControl
          errorMessage={errors.title?.message}
        >
          <Input
            autoFocus
            inputRef={register}
            type="text"
            name="title"
            placeholder={t('cardDecks.createModal.inputTitle')}
            defaultValue={defaultValue?.title}
          />
        </FormControl>
      </Box>
      <Box
        mt={6}
      >
        <CardDecksEditFormInfoText
          text={t('cardDecks.createModal.enableLableText')}
        />
        <CardDecksEditFormLabels
          label={t('cardDecks.createModal.label')}
          value={t('cardDecks.createModal.value')}
        />
        <CardDecksEditFormContent
          setValue={setValue}
          register={register}
          handleRemoveCardDeck={handleRemoveCardDeck}
          cardDecks={cardDecks}
          cardDecksDefault={cardDecksDefault}
        />
        <Box>
          <Button
            StartIcon={IconAdd}
            variant="primary-outline"
            onClick={handleAddCardDeck}
          >
            {t('cardDecks.createModal.addCardInputBtn')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { CardDecksEditForm };
