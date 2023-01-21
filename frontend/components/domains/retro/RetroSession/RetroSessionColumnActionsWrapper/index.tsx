import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { RetroSessionColumnActions } from '@components/domains/retro/RetroSession/RetroSessionColumnActions';
import { RetroSessionColumnActionsModal } from '@components/domains/retro/RetroSession/RetroSessionColumnActionsModal';

import { detect } from '@lib/detect';

const RetroSessionColumnActionsWrapper = (): React.ReactElement | null => {
  const isColumnActionsSidebarOpen = useSelector(retroSessionsSelectors.getIsColumnActionsSidebarOpen);
  const isMobile = detect.getIsMobile();

  if (!isColumnActionsSidebarOpen) {
    return null;
  }

  if (isMobile) {
    return (
      <RetroSessionColumnActionsModal />
    );
  }

  return (
    <RetroSessionColumnActions />
  );
};

export {
  RetroSessionColumnActionsWrapper,
};
