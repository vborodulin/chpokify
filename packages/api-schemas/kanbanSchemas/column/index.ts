import { coreSchemas } from '@chpokify/api-schemas/coreSchemas';
import { transServer } from '@chpokify/i18n';
import {
  KANBAN_BOARD_TITLE_MAX_LENGTH,
  KANBAN_BOARD_TITLE_MIN_LENGTH,
  TKanbanBoard,
  TKanbanColumn,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

export namespace kanbanColumnSchemas {
    const TitleSchema = Joi.string()
      .min(KANBAN_BOARD_TITLE_MIN_LENGTH)
      .max(KANBAN_BOARD_TITLE_MAX_LENGTH)
      .messages({
        'string.min': transServer.t('schemas.pokerSession.title.string.min', {
          min: KANBAN_BOARD_TITLE_MIN_LENGTH,
          max: KANBAN_BOARD_TITLE_MAX_LENGTH,
        }),
        'string.max': transServer.t('schemas.pokerSession.title.string.max', {
          min: KANBAN_BOARD_TITLE_MIN_LENGTH,
          max: KANBAN_BOARD_TITLE_MAX_LENGTH,
        }),
        'string.empty': transServer.t('schemas.kanban.column.title.string.empty'),
        'any.required': transServer.t('schemas.kanban.column.title.string.empty'),
      });

    const KanbanColumnSchema = Joi.object({
      _id: coreSchemas.ObjectIdSchema.required(),
      title: TitleSchema.required(),
    });

    /**
     * Create
     */
    export type TCreateColumnBodyReq = {
        title: TKanbanColumn['title'];
    }

    export type TCreateColumnResResp = {
        board: TKanbanBoard
    }
    /**
     * Update
     */
    export type TUpdateColumnBodyReq = {
        title?: TKanbanColumn['title'];
    }

    export type TUpdateColumnResResp = {
        board: TKanbanBoard
    }

    /**
     * Get
     */
    export type TGetColumnResResp = {
        column: TKanbanColumn
    }
    /**
     * Get many
     */
    export type TGetManyColumnsResResp = {
        columns: TKanbanColumn[]
    }
    /**
     * Remove
     */
    export type TRemoveColumnResResp = {
        board: TKanbanBoard
    }

    export const createColumnSchema = Joi.object({
      body: {
        title: KanbanColumnSchema.extract('title'),
      },
    })
      .unknown(true);

    export const updateColumnSchema = Joi.object({
      body: {
        title: KanbanColumnSchema.extract('title')
          .optional(),
      },
    })
      .unknown(true);

}
