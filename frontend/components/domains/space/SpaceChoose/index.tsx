import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { Layout, TLayoutProps } from './Layout';

export type TSpaceChooseProps = Partial<TLayoutProps>;

const SpaceChoose = (props: TSpaceChooseProps): React.ReactElement | null => {
  const spaces = useSelector(spacesSelectors.getMySpaces);

  const isLeaving = useSelector(asyncPendingSelectors.createPendingSelector)([
    spacesActionsTypes.LEAVE_PENDING,
  ]);

  return (
    <Layout
      spaces={spaces}
      isLeaving={isLeaving}
      {...props}
    />
  );
};

export {
  SpaceChoose,
};
