import { RETRO_TEMPLATE_TYPE } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { css } from 'styled-components';

import { TRetroSessionEditFormProps } from '@components/domains/retro/RetroSessionEditForm';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Image } from '@components/uiKit/Image';
import { Text, TTextProps } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const rootCursorPointer = css`
cursor:pointer;
`;
const rootActiveMixin = css`
border-color:${({ theme }) => theme.colors.primary.normal};
`;

const Root = styled(Flex)<TFlexProps & { isActive?: RETRO_TEMPLATE_TYPE, hasEdit?: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.base.a_10};
  border: 2px solid ${({ theme }) => theme.colors.base.normal};
  border-radius: 8px;
  gap:16px;
  
  &:hover{
    ${({ hasEdit }) => hasEdit && [rootActiveMixin, rootCursorPointer]} 
  }
  
  ${({ isActive }) => isActive && rootActiveMixin} 
`;

type TRetroSessionTemplateProps = Partial<TFlexProps>
  & Pick<TRetroSessionEditFormProps, 'onChooseTemplate' | 'hasEdit'>
  & {
  isActive?: boolean
}

const RetroSessionTemplate = (props: TRetroSessionTemplateProps): React.ReactElement | null => {
  const {
    type,
    isActive,
    onChooseTemplate,
    hasEdit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  let img = '/images/retro/retro-template-3-columns';

  if (type === RETRO_TEMPLATE_TYPE.WENT_WELL_GO_WELL) {
    img = '/images/retro/retro-template-2-columns';
  }

  if (isActive) {
    img += '-active';
  }

  const handleClick = () => {
    if (hasEdit && onChooseTemplate) {
      onChooseTemplate(type);
    }
  };

  const renderTextInfo = (txt: string, txtProps?: Partial<TTextProps>) => {
    let color = 'font.normal';

    if (isActive) {
      color = 'primary.normal';
    }

    return (
      <Text
        color={color}
        {...txtProps}
      >
        {txt}
      </Text>
    );
  };

  return (
    <Root
      py={5}
      px={4}
      isActive={isActive}
      hasEdit={hasEdit}
      onClick={handleClick}
      {...other}
    >
      <Flex
        flex={1}
        flexDirection="column"
      >
        <Image
          src={`${img}.jpg`}
          alt="retro-template"
          width="64px"
          height="64px"
          layout="intrinsic"
        />
      </Flex>
      <Flex
        flex={3}
        flexDirection="column"
      >
        {
          renderTextInfo(t(`pages.retro.retroSessionTemplates.${type}.title`), {
            fontSize: 3,
            fontWeight: 1,
          })
        }
        {
          renderTextInfo(t(`pages.retro.retroSessionTemplates.${type}.description`), {
            fontSize: 2,
          })
        }
      </Flex>
    </Root>
  );
};

export {
  RetroSessionTemplate,
};
