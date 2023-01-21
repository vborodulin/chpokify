import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';

import { TKanbanBoardIdColumnIdTasksIdsDocument } from '@models/kanban/boardIdColumnIdTasksIds/types';

class KanbanBoardRelationsService {
  public constructor(private boardRelations: TKanbanBoardIdColumnIdTasksIdsDocument) {
  }

  public removeTask(taskIdRemove:TEntityID) {
    this.boardRelations.tasksIds = this.boardRelations.tasksIds.filter((taskId) => !isEqualsId(taskId, taskIdRemove));
    this.boardRelations.markModified('tasksIds');
  }

  public moveTaskInColumn(
    taskId: TEntityID,
    taskStartIdx: number,
    taskFinishIdx: number
  ) {
    const newTaskIds = Array.from(this.boardRelations.tasksIds);

    newTaskIds.splice(taskStartIdx, 1);
    newTaskIds.splice(taskFinishIdx, 0, taskId);

    this.boardRelations.set({ tasksIds: newTaskIds });
  }

  public static moveTaskInBetweenColumns(
    boardRelationsFromColumnStart:TKanbanBoardIdColumnIdTasksIdsDocument,
    boardRelationsFromColumnFinish:TKanbanBoardIdColumnIdTasksIdsDocument,
    data:{taskStartIdx:number, taskFinishIdx:number, taskId:string}
  ) {
    const { taskId, taskFinishIdx, taskStartIdx } = data;
    const startTaskIds = Array.from(boardRelationsFromColumnStart.tasksIds);
    startTaskIds.splice(taskStartIdx, 1);

    const finishTaskIds = Array.from(boardRelationsFromColumnFinish.tasksIds);
    finishTaskIds.splice(taskFinishIdx, 0, taskId);

    boardRelationsFromColumnStart.set({ tasksIds: startTaskIds });
    boardRelationsFromColumnFinish.set({ tasksIds: finishTaskIds });
  }
}

export { KanbanBoardRelationsService };
