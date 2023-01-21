import { Router } from 'express';

import { kanbanBoardRouter } from '@spaces/kanban/board/routes';

const kanbanRouter = Router();

kanbanRouter.use(
  '/boards',
  kanbanBoardRouter
);

export {
  kanbanRouter,
};
