import React from 'react';
import { useDispatch } from 'react-redux';

import { spacesOperations } from '@Redux/domains/spaces/operations';

import { Layout } from './Layout';

export type TInviteToSpaceAcceptFail = {
  errMsg: string
};

const InviteToSpaceAcceptFail = (props: TInviteToSpaceAcceptFail): React.ReactElement | null => {
  const {
    errMsg,
  } = props;

  const dispatch = useDispatch();

  const handleCancel = async () => {
    await dispatch(spacesOperations.redirectToCurrSpace());
  };

  return (
    <Layout
      errMsg={errMsg}
      onCancel={handleCancel}
    />
  );
};

export {
  InviteToSpaceAcceptFail,
};
