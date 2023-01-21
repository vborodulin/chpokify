import React, { useRef } from 'react';
import shortid from 'shortid';

import {
  IntegrationsSpacePromoMenu,
} from '@components/domains/integrations/IntegrationsSpacePromoMenuWithBtn/IntegrationsSpacePromoMenu';
import { INTEGRATION_TYPE } from '@components/domains/integrations/types';
import { IconBtnWithMenu, TIconBtnWithMenuProps } from '@components/domains/shared/IconBtnWithMenu';

export type TIntegrationsSpacePromoMenuWithBtnProps = Partial<TIconBtnWithMenuProps> & {
  baseUrl: string;
  menuProps: {
    hasRemoveItem: boolean,
    hasRefreshItem: boolean,
  };
  typeIntegration: INTEGRATION_TYPE
}

const IntegrationsSpacePromoMenuWithBtn = (props: TIntegrationsSpacePromoMenuWithBtnProps): React.ReactElement => {
  const {
    baseUrl,
    menuProps,
    typeIntegration,
  } = props;
  const menuPopperIdRef = useRef<string>(
    `integrationSpacePromoEditMenu-${shortid()}`
  );

  return (
    <IconBtnWithMenu
      display="flex"
      popperId={menuPopperIdRef.current}
      menu={(
        <IntegrationsSpacePromoMenu
          {...menuProps}
          typeIntegration={typeIntegration}
          baseUrl={baseUrl}
        />
      )}
    />
  );
};

export {
  IntegrationsSpacePromoMenuWithBtn,
};
