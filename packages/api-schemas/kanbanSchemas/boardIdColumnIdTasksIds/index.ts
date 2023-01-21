import { coreSchemas, storiesSchemas } from '@chpokify/api-schemas';
import {
  TEntityID,
  TKanbanBoardIdColumnIdTasksIds, TKanbanColumn,
  TStory,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

export namespace kanbanBoardIdColumnIdTasksIdsSchemas {

  // const TasksIdsSchema = Joi.array()
  //   .items(coreSchemas.ObjectIdSchema);
  //
  // const KanbanBoardRelationsSchema = Joi.object({
  //   boardId: coreSchemas.ObjectIdSchema.required(),
  //   columnId: coreSchemas.ObjectIdSchema.required(),
  //   tasksIds: TasksIdsSchema.required(),
  // });

  export const createTaskSchema = Joi.object({
    body: {
      title: storiesSchemas.storySchema.extract('title')
        .required(),
      description: storiesSchemas.storySchema.extract('description'),
    },
  })
    .unknown(true);

  export const moveTaskSchema = Joi.object({
    params: {
      kanbanColumnId: coreSchemas.ObjectIdSchema.required(),
    },
    body: {
      taskId: coreSchemas.ObjectIdSchema.required(),
      taskStartIdx: Joi.number()
        .required(),
      taskFinishIdx: Joi.number()
        .required(),
    },
  })
    .unknown(true);

  export const moveTaskBetweenColumnsSchema = Joi.object({
    body: {
      columnStartId: coreSchemas.ObjectIdSchema.required(),
      columnFinishId: coreSchemas.ObjectIdSchema.required(),
      taskId: coreSchemas.ObjectIdSchema.required(),
      taskStartIdx: Joi.number()
        .required(),
      taskFinishIdx: Joi.number()
        .required(),
    },
  })
    .unknown(true);

  /**
   * Create
   */
  export type TCreateBodyReq = {
    title: TStory['title'];
    description: TStory['description'];
  }
  export type TCreateResResp = {
    boardRelations: TKanbanBoardIdColumnIdTasksIds
  }

  /**
   * Get Many
   */
  export type TGetManyResResp = {
    boardRelations: TKanbanBoardIdColumnIdTasksIds[]
  }

  /**
   * Move task in column
   */
  export type TMoveTaskBodyReq = {
    taskId: TEntityID,
    taskStartIdx: number,
    taskFinishIdx: number,
  }

  /**
   * Move task in between columns
   */
  export type TMoveTaskBetweenColumnsBodyReq = {
    columnStartId: TKanbanColumn['_id'];
    columnFinishId: TKanbanColumn['_id'];
    taskStartIdx:number;
    taskFinishIdx: number;
    taskId: string;
  }

  /**
   * Remove task
   */
  export type TRemoveTaskResResp = {
    boardRelations: TKanbanBoardIdColumnIdTasksIds
  }

}
