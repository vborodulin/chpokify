import React from 'react';

import { TCardDecksEditFormProps } from '@components/domains/space/PokerCardDecksEditForm';
import { CardDecksFormItem } from '@components/domains/space/PokerCardDecksEditForm/CardDecksEditFormItem';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { IconDelete } from '@components/uiKit/Icons';

type CardDecksEditFormContentProps = Omit<TCardDecksEditFormProps,
  'errGlobalMsg' | 'handleAddCardDeck' | 'formId' | 'onSubmit' | 'errors'>;

const CardDecksEditFormContent = (props: CardDecksEditFormContentProps): React.ReactElement | null => {
  const {
    cardDecks,
    cardDecksDefault,
    register,
    handleRemoveCardDeck,
    setValue,
  } = props;

  if (!cardDecks.length) {
    return null;
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, _id: string) => {
    const { value } = e.target;
    const valueNumber = Number(value);

    if (isNaN(valueNumber) || valueNumber < 0) {
      const replaceValue = value.replace(/[^0-9*]/gm, '');
      const validValue = replaceValue ? Number(replaceValue) : replaceValue;
      setValue(`cards[${_id}]value`, validValue as number);
    }

    if (valueNumber > 999) {
      setValue(`cards[${_id}]value`, 999);
    }
  };

  return (
    <Grid
      alignItems="center"
      gridTemplateColumns={[
        '1fr 1fr auto',
      ]}
      gridColumnGap={3}
      gridRowGap={4}
      mb={6}
    >
      {cardDecksDefault.map((item) => (
        <React.Fragment
          key={item._id.toString()}
        >
          <CardDecksFormItem
            textProps={{
              label: item?.name,
              icon: item?.icon,
              type: item.type,
            }}
          />
          <CardDecksFormItem
            textProps={{
              label: '-',
              type: item.type,
            }}
          />
          <Box />
        </React.Fragment>
      ))}
      {cardDecks.filter((item) => !item.default)
        .map((item, idx) => (
          <React.Fragment
            key={item._id.toString()}
          >
            <CardDecksFormItem
              inputProps={{
                autoFocus: item.focus,
                inputRef: register,
                name: `cards[${item._id.toString()}]name`,
                placeholder: 'Label',
                defaultValue: item?.name,
              }}
            />
            <CardDecksFormItem
              inputProps={{
                inputRef: register,
                name: `cards[${item._id.toString()}]value`,
                placeholder: '0-999',
                pattern: '[0-9]*',
                minLength: 1,
                maxLength: 999,
                defaultValue: item?.value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e, item._id.toString()),
              }}
            />
            {
              item.hasBtnRemove ? (
                <Button
                  StartIcon={IconDelete}
                  onClick={() => handleRemoveCardDeck(idx, item._id.toString())}
                />
              ) : <Box />
            }

          </React.Fragment>
        ))}
    </Grid>
  );
};

export { CardDecksEditFormContent };
