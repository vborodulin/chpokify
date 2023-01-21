import { useTranslation } from 'next-i18next';
import React from 'react';

import { KanbanBoardCreateBtn } from '@components/domains/kanban/buttons/KanbanCreateBoardBtn';

import { ContentThumb, TContentThumbProps } from '@components/uiKit/ContentThumb';
import { IconBoard } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TKanbanThumbProps = Partial<TContentThumbProps>;

const KanbanThumb = (props: TKanbanThumbProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <ContentThumb
      Icon={IconBoard}
      title={t('kanbanThumb.title')}
      description={t('kanbanThumb.description')}
      button={(
        <KanbanBoardCreateBtn />
      )}
      {...other}
    />
  );
};

export {
  KanbanThumb,
};
