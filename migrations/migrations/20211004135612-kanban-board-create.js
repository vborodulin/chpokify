const { ObjectID } = require('bson');

const getNextIdTask = async (model, spaceId) => {
  const findStory = await model.find({ spaceId }, ['id'])
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  if (findStory.length) {
    const [story] = findStory;
    return Number(story.id) + 1;
  }

  return 1;
};

module.exports = {
  async up(db) {
    const spaceModel = db.collection('spacers');
    const kanbanBoardModel = db.collection('kanbanboards');
    const kanbanRelationModel = db.collection('kanbanboardidcolumnidtasksids');
    const taskModel = db.collection('stories');

    const spaces = await spaceModel
      .find({}, { projection: { participants: 1 } })
      .toArray();

    if (!spaces.length) {
      return;
    }

    const columnsNames = [
      'TODO',
      'IN PROGRESS',
      'DONE',
    ];

    const dataColumn = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
      deletedAt: null,
    };

    const dataBoard = {
      isDeleted: false,
      deletedAt: null,
      columns: [],
      title: 'Default board',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    for (const space of spaces) {
      const dataTask = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
        deletedAt: null,
      };

      const findParticipantAdmin = space.participants.find((el) => el.role === 2);

      if (!findParticipantAdmin) {
        continue;
      }

      const board = await kanbanBoardModel.insertOne({
        ...dataBoard,
        userId: findParticipantAdmin.userId,
        spaceId: space._id,
      });

      if (!board) {
        return;
      }

      const boardId = board.insertedId;
      const columns = [];

      for (const columnName of columnsNames) {
        const columnId = new ObjectID();
        columns.push({
          ...dataColumn,
          _id: columnId,
          title: columnName,
        });

        const tasksIds = [];

        if (columnName === 'TODO') {
          const nextTaskId = await getNextIdTask(taskModel, space._id);
          const task = await taskModel.insertOne({
            ...dataTask,
            title: 'My first todo',
            spaceId: space._id,
            id: nextTaskId,
          });

          if (task) {
            const taskId = task.insertedId;
            tasksIds.push(taskId);
          }
        }

        await kanbanRelationModel.insertOne({
          ...dataColumn,
          boardId,
          columnId,
          tasksIds,
        });
      }

      await kanbanBoardModel.updateOne(
        {
          _id: boardId,
        },
        {
          $set: {
            columns,
          },
        }
      );
    }
  },
};
