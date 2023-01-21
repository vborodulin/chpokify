import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { UserMenu } from '@components/domains/user/AvatarWithUserMenu/UserMenu';
import { UserAvatar } from '@components/domains/user/UserAvatar';

import { Button } from '@components/uiKit/Button';
import { IconChevronDown } from '@components/uiKit/Icons';

import { Popper } from '@components/utils/Popper';
import { popperMenuOptions } from '@components/utils/Popper/options/menu';

const AvatarWithUserMenu = (): React.ReactElement | null => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const POPPER_ID = `userMenu-${currUserId}`;

  return (
    <>
      <Button
        ref={setTargetElement}
        data-test-id={DATA_TEST_ID.USER_AVATAR}
        startIcon={(
          <UserAvatar
            userId={currUserId}
            variant="circle"
            dimension="50"
          />
                )}
        EndIcon={IconChevronDown}
      />

      <Popper
        id={POPPER_ID}
        targetElement={targetElement}
        options={popperMenuOptions}
      >
        <UserMenu />
      </Popper>
    </>
  );
};

export {
  AvatarWithUserMenu,
};
