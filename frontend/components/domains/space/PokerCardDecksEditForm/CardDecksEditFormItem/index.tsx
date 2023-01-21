import { POKER_CARD_DECK_TYPE } from '@chpokify/models-types';
import React from 'react';

import { EntityItem } from '@components/domains/shared/EntityItem';

import { Flex } from '@components/uiKit/Flex';
import * as icons from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';

type TCardDecksFormItemProps = {
  textProps?: {
    label?: string | number | undefined,
    type: POKER_CARD_DECK_TYPE,
    icon?: string,
  },
  inputProps?: Record<string, any>
}

const CardDecksFormItem = (props: TCardDecksFormItemProps): React.ReactElement | null => {
  const {
    textProps,
    inputProps,
  } = props;

  const renderDefaultItem = () => {
    if (!textProps) return null;
    const {
      label,
    } = textProps;

    if (textProps.icon) {
      const IconComponent = (icons as Record<string, any>)[textProps.icon];
      return (
        <EntityItem
          width="100%"
          type="default"
          item={(
            <Flex
              alignItems="center"
            >
              <IconComponent
                width="15px"
                height="15px"
              />
            </Flex>
          )}
          borderRadius={2}
        />
      );
    }

    return (
      <EntityItem
        width="100%"
        type="default"
        item={label}
        borderRadius={2}
      />
    );
  };

  const renderInput = () => (
    <Input
      {...inputProps}
    />
  );

  if (inputProps) return renderInput();

  return renderDefaultItem();
};

export { CardDecksFormItem };
