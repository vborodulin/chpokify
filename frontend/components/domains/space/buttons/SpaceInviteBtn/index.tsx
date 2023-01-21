import React from 'react';
import { useSelector } from 'react-redux';

import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { CopyBtn, TCopyBtnProps } from '@components/domains/shared/CopyBtn';

export type TSpaceInviteBtnProps = Partial<TCopyBtnProps>;

const SpaceInviteBtn = (props: TSpaceInviteBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const handleGetInviteLink = async () => {
    const { payload } = await dispatch(spacesAsyncActions.inviteGen(currSpaceId));

    if (!getIsRejectedActionPayload(payload)) {
      return payload.url;
    }

    return '';
  };

  return (
    <CopyBtn
      getCopyText={handleGetInviteLink}
      {...other}
    />
  );
};

export {
  SpaceInviteBtn,
};
