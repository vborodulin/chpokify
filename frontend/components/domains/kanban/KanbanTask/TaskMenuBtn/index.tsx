import { TEntityID } from '@chpokify/models-types';
import React, { useRef, useState } from 'react';
import shortid from 'shortid';

import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconMoreHorizontal } from '@components/uiKit/Icons';

import { Popper } from '@components/utils/Popper';
import { popperMenuOptions } from '@components/utils/Popper/options/menu';

import { TaskMenu } from './TaskMenu';

export type TTaskMenuBtnProps = Partial<TIconButtonProps> & {
  columnId: TEntityID;
  taskId: TEntityID;
};

const TaskMenuBtn = (props: TTaskMenuBtnProps): React.ReactElement | null => {
  const {
    columnId,
    taskId,
    ...other
  } = props;

  const menuIdRef = useRef(shortid());

  const [rootEl, setRootEl] = useState<any>();

  return (
    <>
      <IconButton
        ref={setRootEl}
        {...other}
        variant="icon"
      >
        <IconMoreHorizontal />
      </IconButton>

      <Popper
        id={menuIdRef.current}
        targetElement={rootEl}
        options={popperMenuOptions}
        isPortal
      >
        <TaskMenu
          taskId={taskId}
          columnId={columnId}
        />
      </Popper>
    </>
  );
};

export {
  TaskMenuBtn,
};
