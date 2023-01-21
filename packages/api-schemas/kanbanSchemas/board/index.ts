import { coreSchemas } from '@chpokify/api-schemas/coreSchemas';
import { transServer } from '@chpokify/i18n';
import {
  KANBAN_BOARD_TITLE_MAX_LENGTH,
  KANBAN_BOARD_TITLE_MIN_LENGTH,
  KANBAN_BOARD_DESC_MIN_LENGTH,
  KANBAN_BOARD_DESC_MAX_LENGTH,
  TEntityID,
  TKanbanBoard,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

export namespace kanbanBoardSchemas {
  const TitleSchema = Joi.string()
    .min(KANBAN_BOARD_TITLE_MIN_LENGTH)
    .max(KANBAN_BOARD_TITLE_MAX_LENGTH)
    .empty('')
    .messages({
      'string.min': transServer.t('schemas.pokerSession.title.string.min', {
        min: KANBAN_BOARD_TITLE_MIN_LENGTH,
        max: KANBAN_BOARD_TITLE_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.title.string.max', {
        min: KANBAN_BOARD_TITLE_MIN_LENGTH,
        max: KANBAN_BOARD_TITLE_MAX_LENGTH,
      }),
    });
  const DescSchema = Joi.string()
    .min(KANBAN_BOARD_DESC_MIN_LENGTH)
    .max(KANBAN_BOARD_DESC_MAX_LENGTH)
    .empty('')
    .messages({
      'string.min': transServer.t('schemas.pokerSession.description.string.min', {
        min: KANBAN_BOARD_DESC_MIN_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.description.string.max', {
        max: KANBAN_BOARD_DESC_MAX_LENGTH,
      }),
    });

  const ColumnIdsSchema = Joi.array()
    .items(coreSchemas.ObjectIdSchema);

  const KanbanBoardSchema = Joi.object({
    title: TitleSchema,
    desc: DescSchema,
    columnsIds: ColumnIdsSchema,
  });

  /**
   * Create
   */
  export type TCreateBoardBodyReq = {
    title?: TKanbanBoard['title'];
    desc?: TKanbanBoard['desc'];
  }
  export type TCreateBoardResResp = {
    board: TKanbanBoard
  }
  /**
   * Move column
   */
  export type TMoveColumnBodyReq = {
    columnStartIdx: number;
    columnFinishIdx: number;
    columnId: TEntityID;
  }
  /**
   * Update
   */
  export type TUpdateBoardBodyReq = {
    title?: TKanbanBoard['title'];
    desc?: TKanbanBoard['desc'];
  }
  export type TUpdateBoardResResp = {
    board: TKanbanBoard;
  };
  /**
   * Get many
   */
  export type TGetManyBoardsResResp = {
    boards: TKanbanBoard[]
  }
  /**
   * Get
   */
  export type TGetBoardResResp = {
    board: TKanbanBoard
  }
  /**
   * Remove
   */
  export type TRemoveBoardResResp = {
    boardId: TEntityID;
  };

  export const createBoardSchema = Joi.object({
    body: KanbanBoardSchema,
  })
    .unknown(true);

  export const updateBoardSchema = Joi.object({
    params: {
      boardId: coreSchemas.ObjectIdSchema.required(),
    },
    body: {
      title: KanbanBoardSchema.extract('title')
        .optional(),
      desc: KanbanBoardSchema.extract('desc')
        .optional(),
    },
  })
    .unknown(true);

  export const moveColumnSchema = Joi.object({
    params: {
      boardId: coreSchemas.ObjectIdSchema.required(),
    },
    body: {
      columnStartIdx: Joi.number()
        .required(),
      columnFinishIdx: Joi.number()
        .required(),
      columnId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

}
