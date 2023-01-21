import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { Avatar } from '@components/uiKit/Avatar';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconChevronDown } from '@components/uiKit/Icons';

import { Popper } from '@components/utils/Popper';
import { popperMenuOptions } from '@components/utils/Popper/options/menu';
import { TRANS } from '@components/utils/types';

import { SpacesListMenu } from './SpacesListMenu';

export type TSpacesListMenuWithBtnProps = TButtonProps & {};

const SpacesListMenuWithBtn = (props: TSpacesListMenuWithBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const menuId = 'spacesListMenuW';
  const [btnEl, setBtnEl] = useState<any>();

  const currSpace = useSelector(spacesSelectors.getCurrSpace);

  const renderTextToButton = () => {
    if (!currSpace?.name) {
      return t('spacesListMenuWithBtn.title');
    }

    return currSpace.name;
  };

  return (
    <>
      <Button
        ref={setBtnEl}
        startIcon={(
          <Avatar
            variant="rounded"
            dimension="50"
            svg={currSpace?.generatedAvatarSvg}
            mr={2}
          />
        )}
        EndIcon={IconChevronDown}
        pl={2}
        isMobileReady
        {...other}
      >
        {renderTextToButton()}
      </Button>

      <Popper
        id={menuId}
        targetElement={btnEl}
        options={{
          ...popperMenuOptions,
          placement: 'bottom-start',
        }}
      >
        <SpacesListMenu />
      </Popper>
    </>
  );
};

export {
  SpacesListMenuWithBtn,
};
