import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { DropResult } from 'react-beautiful-dnd';

import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';
import { useAppDispatch } from '@Redux/hooks';

type TUseRetroSessionDragEndProps = {
  retroSessionId: TEntityID;
  retroTemplateId: TEntityID;
  spaceId: TEntityID;
}

const useRetroSessionDragEnd = (props: TUseRetroSessionDragEndProps) => {
  const {
    retroSessionId,
    retroTemplateId,
    spaceId,
  } = props;

  const dispatch = useAppDispatch();

  const combinedCard = async (
    cardIdDest:string,
    cardIdSource:string,
    columnIdSource:string
  ) => {
    if (!cardIdDest || !cardIdSource) {
      return;
    }

    const sendData = {
      retroSessionId,
      cardId: cardIdSource,
      columnId: columnIdSource,
    };

    await dispatch(
      retroSessionsCardsAsyncActions.combinedCard(spaceId, cardIdDest, sendData)
    );
  };

  const moveCardBetweenColumn = async (
    result: DropResult,
    startColumnId: TEntityID,
    finishColumnId: TEntityID
  ) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    const sendData = {
      columnStartId: startColumnId,
      columnFinishId: finishColumnId,
      cardStartIdx: source.index,
      cardFinishIdx: destination.index,
      cardId: draggableId,
    };

    await dispatch(
      retroSessionsRelationsAsyncActions.moveCardBetweenColumns(retroSessionId, retroTemplateId, sendData)
    );
  };

  const moveCardInColumn = async (result: DropResult, startColumnId: TEntityID) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    const sendData = {
      cardStartIdx: source.index,
      cardFinishIdx: destination.index,
      cardId: draggableId,
    };

    await dispatch(
      retroSessionsRelationsAsyncActions.moveCardInColumn(retroSessionId, retroTemplateId, startColumnId, sendData)
    );
  };

  const handleSavePositionColumn = async (result: DropResult) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    const sendData = {
      columnStartIdx: source.index,
      columnFinishIdx: destination.index,
      columnId: draggableId,
    };

    await dispatch(
      retroTemplatesAsyncActions.moveColumn(retroSessionId, retroTemplateId, sendData)
    );
  };

  const handleSavePositionCard = async (result: DropResult) => {
    const {
      source,
      destination,
      combine,
      draggableId,
    } = result;

    if (combine && draggableId) {
      await combinedCard(combine.draggableId, draggableId, source.droppableId);
      return;
    }

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (!startColumnId || !finishColumnId) return;

    if (isEqualsId(startColumnId, finishColumnId)) {
      await moveCardInColumn(result, startColumnId);
      return;
    }

    await moveCardBetweenColumn(result, startColumnId, finishColumnId);
  };

  const handleSavePosition = (result: DropResult) => {
    const { type } = result;

    switch (type) {
      case 'card':
        handleSavePositionCard(result);
        break;
      case 'column':
        handleSavePositionColumn(result);
        break;
      default:
        break;
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    await handleSavePosition(result);
  };

  return {
    handleDragEnd,
    handleSavePosition,
    handleSavePositionCard,
    handleSavePositionColumn,
    moveCardInColumn,
  };
};

export {
  useRetroSessionDragEnd,
};
