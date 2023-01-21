import { routing } from '@chpokify/routing';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

import { TKanbanBoardActionsProps } from '@components/domains/kanban/KanbanBoard/KanbanBoardHeader/KanbanBoardActions';
import { CopyBtn, TCopyBtnProps } from '@components/domains/shared/CopyBtn';

export type TKanbanBoardInviteBtnProps = Partial<TCopyBtnProps> &
  Pick<TKanbanBoardActionsProps, 'spaceId' | 'boardId' | 'canModerate'>;

const KanbanBoardInviteBtn = (props: TKanbanBoardInviteBtnProps): React.ReactElement | null => {
  const {
    spaceId,
    boardId,
    canModerate,
    ...other
  } = props;

  const router = useRouter();

  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    router.locale + routing.getKanbanBoardUrl(spaceId, boardId)
  );

  if (!canModerate) {
    return null;
  }

  const handleGetInviteLink = () => absoluteUrl;

  return (
    <CopyBtn
      variant="primary"
      getCopyText={handleGetInviteLink}
      hideTimeout={1500}
      {...other}
    />
  );
};

export {
  KanbanBoardInviteBtn,
};
