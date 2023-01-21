import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TSpaceStatisticsProps = Partial<TLayoutProps>;

const SpaceStatistics = (props: TSpaceStatisticsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const stat = useSelector(spacesSelectors.getSpaceStat)(
    currSpaceId
  );

  useEffect(() => {
    dispatch(spacesAsyncActions.getStat(currSpaceId));
  }, [currSpaceId]);

  return (
    <Layout
      stat={stat}
      {...other}
    />
  );
};

export {
  SpaceStatistics,
};
