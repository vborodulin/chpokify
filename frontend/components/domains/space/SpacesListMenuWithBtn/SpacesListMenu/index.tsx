import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { routingHelpers } from '@chpokify/routing/helpers';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Avatar } from '@components/uiKit/Avatar';
import { Box } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';
import { IconAdd, IconCheck } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemEndAdornment } from '@components/uiKit/ListItemEndAdornment';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem } from '@components/uiKit/MenuItem';
import { Text } from '@components/uiKit/Text';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TSpacesListMenuProps = {
  onClose?: () => void;
};

const SpacesListMenu = React.forwardRef<any, TSpacesListMenuProps>((props, ref) => {
  const {
    onClose,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const isCurrUserGuest = useSelector(authSelectors.isCurrUserGuest);
  const spaces = useSelector(spacesSelectors.getMySpaces);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const getCanModerate = useSelector(spacesSelectors.getCanModerate);

  const [targetElement, setTargetElement] = useState<any>();
  const popperIdRef = useRef(`createSpace-${shortid()}`);

  const handleCreateSpace = () => {
    if (isCurrUserGuest) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.SPACE_CREATE));
  };

  const handleNavPoker = async (spaceId: TEntityID) => {
    await router.push(
      routing.getSpaceUrlTemplate(),
      routing.getSpaceUrl(spaceId)
    );
  };

  const handleNavRetro = async (spaceId: TEntityID) => {
    await router.push(
      routing.getRetroUrlTemplate(),
      routing.getRetroUrl(spaceId)
    );
  };

  const handleNavKanban = async (spaceId: TEntityID) => {
    await router.push(
      routing.getKanbanUrlTemplate(),
      routing.getKanbanUrl(spaceId)
    );
  };

  const handleSpaceClick = async (spaceId: TEntityID) => {
    if (routingHelpers.match(router.pathname, routing.getRetroUrlTemplate(), true)) {
      await handleNavRetro(spaceId);
    } else if (routingHelpers.match(router.pathname, routing.getKanbanUrlTemplate(), true)) {
      await handleNavKanban(spaceId);
    } else {
      await handleNavPoker(spaceId);
    }
  };

  const renderSpacesList = () => {
    if (!spaces.length) {
      return null;
    }

    return spaces.map(({
      _id,
      name,
      generatedAvatarSvg,
    }) => {
      const isChecked = isEqualsId(currSpaceId, _id);

      const handleClick = async () => {
        await handleSpaceClick(_id.toString());
      };

      return (
        <MenuItem
          key={_id.toString()}
          isButton
          onClick={handleClick}
          onClose={onClose}
        >
          <ListItemAdornment>
            <Avatar
              variant="rounded"
              dimension="50"
              svg={generatedAvatarSvg}
            />
          </ListItemAdornment>

          <Box
            flexGrow={1}
          >
            <Text
              fontSize={2}
            >
              {name}
            </Text>

            {
              getCanModerate(_id, currUserId) && (
                <Text
                  fontSize={2}
                  color="font.d_30"
                >
                  {t('userMenu.spaceAdminLabel')}
                </Text>
              )
            }
          </Box>

          {
            isChecked && (
              <ListItemEndAdornment>
                <IconCheck />
              </ListItemEndAdornment>
            )
          }
        </MenuItem>
      );
    });
  };

  const renderTooltip = () => {
    if (!isCurrUserGuest) {
      return null;
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'bottom',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {t('userMenu.toogleAdminGuestTooltip')}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  return (
    <Menu
      ref={ref}
      width="240px"
      {...other}
    >
      {renderSpacesList()}

      <Divider />

      <Box
        ref={setTargetElement}
      >
        <MenuItem
          isButton
          disabled={isCurrUserGuest}
          onClick={handleCreateSpace}
          className={CLASS_TEST.SPACE_CREATE_USER_MENU_ITEM}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconAdd />
          </ListItemAdornment>

          <ListItemText>
            {t('spaceCreateBtn.title')}
          </ListItemText>
        </MenuItem>
        {renderTooltip()}
      </Box>

    </Menu>
  );
});

SpacesListMenu.displayName = 'SpacesListMenu';

export {
  SpacesListMenu,
};
