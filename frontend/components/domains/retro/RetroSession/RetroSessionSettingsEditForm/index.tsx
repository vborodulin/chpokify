import { TRetroSession } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { FormHelperText } from '@components/uiKit/FormHelperText';
import {
  IconCount,
  IconDelete,
  IconDrag,
  IconEdit,
  IconGroupOfUsers, IconNote,
  IconRefresh,
  IconSortDescending,
  IconThumbs,
  IconUserAvatar,
} from '@components/uiKit/Icons';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { MenuItem } from '@components/uiKit/MenuItem';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';
import { TRANS } from '@components/utils/types';

import { SettingDescriptionCards } from './SettingDescriptionCards';
import { SettingEditCards } from './SettingEditCards';
import { SettingMaxVotesCards } from './SettingMaxVotesCards';
import { SettingMenuWrapper } from './SettingMenuWrapper';
import { SettingMoveCards } from './SettingMoveCards';
import { SettingOneVoteCards } from './SettingOneVoteCards';
import { SettingSortByVoteCountCards } from './SettingSortByVoteCountCards';
import { SettingUserNameCards } from './SettingUserNameCards';
import { SettingVoteCountCards } from './SettingVoteCountCards';

export type TFormData = Pick<TRetroSession,
  'isHiddenUserNameCards' | 'canMoveCards' | 'canEditCards' |
  'isHiddenVoteCountCards' | 'maxVotesCard' | 'isOneVoteCards' |
  'isSortByVotesCount' | 'isHiddenDescriptionCards'>

export type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export const FORM_FIELDS: (keyof TFormData)[] = [
  'isHiddenVoteCountCards',
  'isHiddenUserNameCards',
  'isOneVoteCards',
  'isSortByVotesCount',
  'canMoveCards',
  'maxVotesCard',
];

const RetroSessionSettingsEditForm = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
  } = useForm<TFormData>();

  const { errGlobalMsg } = useAsyncActionInfo(
    [retroSessionsActionsTypes.UPDATE_PENDING],
    FORM_FIELDS,
    setError
  );

  const handleClickResetVotes = async () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_RESET_VOTES_CARDS, {
      retroSessionId: currRetroSessionId,
    }));
  };

  const handleClickRemoveSession = async () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_REMOVE, {
      retroSessionId: currRetroSessionId,
    }));
  };

  const onSubmit = (field: keyof TFormData) => async (data: TFormData) => {
    if (!currRetroSessionId) {
      return;
    }

    let valueSend = data[field];

    if (field === 'maxVotesCard') {
      valueSend = Number(valueSend);
    } else if (field === 'isOneVoteCards' || field === 'isSortByVotesCount') {
      valueSend = !valueSend;
    }

    await dispatch(retroSessionsAsyncActions.update(currRetroSessionId, {
      [field]: valueSend,
    }));
  };

  const renderTitleItem = (title: string) => (
    <MenuItem>
      <ListItemText
        textProps={{
          fontSize: 2,
          fontWeight: 1,
        }}
      >
        {title}
      </ListItemText>
    </MenuItem>
  );

  if (!currRetroSessionId) {
    return null;
  }

  return (
    <>
      {
        renderTitleItem(t('pages.retro.settingsSidebar.votingTitle'))
      }
      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.isOneVoteCards.title')}
        onClick={handleSubmit(onSubmit('isOneVoteCards'))}
        icon={(
          <IconThumbs />
        )}
        setting={(
          <SettingOneVoteCards
            formRefs={{
              isOneVoteCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('isOneVoteCards'))}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.isHiddenVoteCountCards.title')}
        onClick={handleSubmit(onSubmit('isHiddenVoteCountCards'))}
        icon={(
          <IconCount />
        )}
        setting={(
          <SettingVoteCountCards
            formRefs={{
              isHiddenVoteCountCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('isHiddenVoteCountCards'))}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.isSortByVotesCount.title')}
        onClick={handleSubmit(onSubmit('isSortByVotesCount'))}
        icon={(
          <IconSortDescending />
        )}
        setting={(
          <SettingSortByVoteCountCards
            formRefs={{
              isSortByVotesCount: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('isSortByVotesCount'))}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.maxVotes.title')}
        onClick={handleSubmit(onSubmit('maxVotesCard'))}
        icon={(
          <IconGroupOfUsers />
        )}
        setting={(
          <SettingMaxVotesCards
            formRefs={{
              maxVotesCard: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('maxVotesCard'))}
            setValue={setValue}
          />
        )}
      />

      <ListItemDivider />

      {
        renderTitleItem(t('pages.retro.settingsSidebar.cardsTitle'))
      }

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.canEditCards.title')}
        onClick={handleSubmit(onSubmit('canEditCards'))}
        icon={(
          <IconEdit />
        )}
        setting={(
          <SettingEditCards
            formRefs={{
              canEditCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('canEditCards'))}
            setValue={setValue}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.canMoveCards.title')}
        onClick={handleSubmit(onSubmit('canMoveCards'))}
        icon={(
          <IconDrag />
        )}
        setting={(
          <SettingMoveCards
            formRefs={{
              canMoveCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('canMoveCards'))}
            setValue={setValue}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.isHiddenDescriptionCards.title')}
        onClick={handleSubmit(onSubmit('isHiddenDescriptionCards'))}
        icon={(
          <IconNote />
        )}
        setting={(
          <SettingDescriptionCards
            formRefs={{
              isHiddenDescriptionCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('isHiddenDescriptionCards'))}
          />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebarEditForm.isHiddenUserNameCards.title')}
        onClick={handleSubmit(onSubmit('isHiddenUserNameCards'))}
        icon={(
          <IconUserAvatar />
        )}
        setting={(
          <SettingUserNameCards
            formRefs={{
              isHiddenUserNameCards: register,
            }}
            errors={errors}
            onChange={handleSubmit(onSubmit('isHiddenUserNameCards'))}
          />
        )}
      />

      <ListItemDivider />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebar.resetAllVotesBtn')}
        onClick={handleClickResetVotes}
        icon={(
          <IconRefresh />
        )}
      />

      <SettingMenuWrapper
        title={t('pages.retro.settingsSidebar.removeSessionBtn')}
        textProps={{
          color: 'negative.normal',
        }}
        onClick={handleClickRemoveSession}
        icon={(
          <IconDelete
            fill="font.negative"
          />
        )}
      />
      <FormHelperText
        variant="negative"
      >
        {errGlobalMsg}
      </FormHelperText>
    </>

  );
};

export {
  RetroSessionSettingsEditForm,
};
