import { useTranslation } from 'next-i18next';
import React from 'react';

import {
  IconDelete, IconDownload, IconEdit, IconGroupOfUsers, IconThumbUpOutline,
} from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu, TMenuProps } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TMenuProps> & {
  cantModerate: boolean;
  hasRating: boolean;
  hasTeamsItem?: boolean;
  hasFeedbackItem?: boolean;
  onEdit: () => void;
  onEditTeams: () => void;
  onFeedBack: () => void;
  onRemove: () => void;
  onClose: () => void;
  onExport: () => void;
};

const Layout = React.forwardRef<any, TLayoutProps>((props, ref) => {
  const {
    cantModerate,
    hasTeamsItem,
    hasFeedbackItem,
    hasRating,
    hasRemoveItem,
    onEdit,
    onEditTeams,
    onFeedBack,
    onRemove,
    onClose,
    onExport,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderEditItem = () => {
    if (cantModerate) {
      return (
        <MenuItem
          isButton
          onClick={onEdit}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconEdit />
          </ListItemAdornment>

          <ListItemText>
            {t('pokerSessionMenu.edit')}
          </ListItemText>
        </MenuItem>
      );
    }

    return null;
  };

  const renderFeedBackItem = () => {
    if (hasRating && cantModerate && hasFeedbackItem) {
      return (
        <MenuItem
          isButton
          onClick={onFeedBack}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconThumbUpOutline />
          </ListItemAdornment>

          <ListItemText>
            {t('pokerSessionStoriesRating.feedBack')}
          </ListItemText>
        </MenuItem>
      );
    }

    return null;
  };

  const renderEditTeamsItem = () => {
    if (hasTeamsItem && cantModerate) {
      return (
        <MenuItem
          isButton
          onClick={onEditTeams}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconGroupOfUsers />
          </ListItemAdornment>

          <ListItemText>
            {t('pokerSessionMenu.editTeams')}
          </ListItemText>
        </MenuItem>
      );
    }

    return null;
  };

  const renderRemoveItem = () => {
    if (hasRemoveItem && cantModerate) {
      return (
        <>
          <ListItemDivider />

          <MenuItem
            isButton
            onClick={onRemove}
            onClose={onClose}
          >
            <ListItemAdornment>
              <IconDelete
                fill="font.negative"
              />
            </ListItemAdornment>

            <ListItemText
              textProps={{
                color: 'font.negative',
              }}
            >
              {t('pokerSessionMenu.remove')}
            </ListItemText>
          </MenuItem>
        </>
      );
    }

    return null;
  };

  const renderExportCsv = () => (
    <MenuItem
      isButton
      onClick={onExport}
      onClose={onClose}
    >
      <ListItemAdornment>
        <IconDownload />
      </ListItemAdornment>

      <ListItemText>
        {t('pokerSessionMenu.exportCSV')}
      </ListItemText>
    </MenuItem>
  );

  const renderContent = () => {
    if (!cantModerate) {
      return null;
    }

    return (
      <>
        {renderEditItem()}
        {renderEditTeamsItem()}
        {renderFeedBackItem()}
        {renderExportCsv()}
        {renderRemoveItem()}
      </>
    );
  };

  return (
    <Menu
      ref={ref}
      {...other}
    >
      {renderContent()}
    </Menu>
  );
});

Layout.displayName = 'Layout';

export {
  Layout,
};
