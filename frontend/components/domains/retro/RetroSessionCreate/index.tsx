import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { DATA_TEST_ID } from '@components/domains/core/types';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconRetro } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TFormData = {
  title: string;
}

const RetroSessionCreate = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
  } = useForm<TFormData>();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const onSubmit = (data: TFormData) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_CREATE, {
      title: data.title,
    }));
  };

  if (!canModerate) {
    return null;
  }

  return (
    <Paper
      variant="card"
      forwardedAs="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PaperHeader>
        {t('pages.retro.createNewSession.title')}
      </PaperHeader>

      <PaperContent>
        <Flex
          flex="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Input
            inputRef={register}
            name="title"
            css={css`flex-grow: 1`}
            placeholder={t('pages.retro.createNewSession.placeholder')}
            mr={3}
          />

          <Button
            StartIcon={IconRetro}
            data-test-id={DATA_TEST_ID.RETRO_SESSION_CREATE_BTN}
            type="submit"
            variant="primary"
          >
            {t('pages.retro.createNewSession.submitBtn')}
          </Button>
        </Flex>
      </PaperContent>
    </Paper>
  );
};

export {
  RetroSessionCreate,
};
