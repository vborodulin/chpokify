import { useTranslation } from 'next-i18next';
import React from 'react';
import { css } from 'styled-components';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconCardsOutline } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TFormData = {
  title: string;
}

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

type TCreateSessionLayoutProps = Partial<TPaperProps> & {
  canModerate: boolean;
  formRefs: TFormRefs,
  onSubmit: () => void;
};

const Layout = (props: TCreateSessionLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    formRefs,
    onSubmit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate) {
    return null;
  }

  return (
    <Paper
      variant="card"
      forwardedAs="form"
      autoComplete="off"
      onSubmit={onSubmit}
      {...other}
    >
      <PaperHeader>
        {t('createNewSession.title')}
      </PaperHeader>

      <PaperContent>
        <Flex
          flex="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Input
            inputRef={formRefs.title}
            name="title"
            css={css`flex-grow: 1`}
            placeholder={t('createNewSession.sessionTitlePlaceholder')}
            mr={3}
          />

          <Button
            StartIcon={IconCardsOutline}
            data-tut-space={SPACE_ONBOARDING_STEP_ID.POKER_SESSION_CREATE_BTN}
            data-test-id={DATA_TEST_ID.POKER_SESSION_CREATE_BTN}
            type="submit"
            variant="primary"
          >
            {t('createNewSession.submitBtn')}
          </Button>
        </Flex>
      </PaperContent>
    </Paper>
  );
};

export {
  Layout,
};
