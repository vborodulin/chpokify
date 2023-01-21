import { useTranslation } from 'next-i18next';
import React from 'react';

import { jiraActions } from '@Redux/domains/jira/actions';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { jiraOperations } from '@Redux/domains/jira/operations';
import { useAppDispatch } from '@Redux/hooks';

import { INTEGRATION_TYPE } from '@components/domains/integrations/types';
import { TLayoutProps } from '@components/domains/poker/PokerSessionMenuWithBtn/PokerSessionMenu/Layout';

import { IconDelete, IconRefresh } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TIntegrationsSpacePromoMenuProps = Partial<TLayoutProps> & {
  baseUrl: string
  typeIntegration: INTEGRATION_TYPE
};

const IntegrationsSpacePromoMenu = React.forwardRef<any, TIntegrationsSpacePromoMenuProps>((props, ref) => {
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const {
    baseUrl,
    onClose = () => {
    },
    hasRefreshItem,
    hasRemoveItem,
    typeIntegration,
    ...other
  } = props;

  const onRefresh = () => {
    const integrationsRefreshMap = {
      [INTEGRATION_TYPE.JIRA]: async () => {
        await jiraOperations.refreshIntegration(baseUrl)(dispatch);
      },
    };
    integrationsRefreshMap[typeIntegration]();
  };

  const onRemove = () => {
    const integrationsRemoveMap = {
      [INTEGRATION_TYPE.JIRA]: async () => {
        dispatch(jiraActions.removeJiraProjects(baseUrl));
        await dispatch(jiraAsyncActions.oauthRemove({
          baseUrl,
        }));
      },
    };
    integrationsRemoveMap[typeIntegration]();
  };

  const renderRefreshBtn = () => {
    if (hasRefreshItem) {
      return (
        <MenuItem
          isButton
          onClick={onRefresh}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconRefresh />
          </ListItemAdornment>

          <ListItemText>
            {t('jiraIntegration.existingIntegrations.refreshBtn')}
          </ListItemText>
        </MenuItem>
      );
    }

    return null;
  };

  const renderRemoveBtn = () => {
    if (hasRemoveItem) {
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
              {t('jiraIntegration.existingIntegrations.removeBtn')}
            </ListItemText>
          </MenuItem>
        </>
      );
    }

    return null;
  };

  const renderBtns = () => (
    <>
      {renderRefreshBtn()}
      {renderRemoveBtn()}
    </>
  );
  return (
    <Menu
      ref={ref}
      {...other}
    >
      {renderBtns()}
    </Menu>

  );
});

IntegrationsSpacePromoMenu.displayName = 'IntegrationsSpacePromoMenu';
export {
  IntegrationsSpacePromoMenu,
};
