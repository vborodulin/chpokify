import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TRetroColumn, TRetroTemplate } from '@chpokify/models-types';
import { createSelector } from '@reduxjs/toolkit';
import { compact, flatten } from 'lodash';

import { TAppState } from '@Redux/types';

const getRetroTemplates = ({ retroTemplates }: TAppState) => retroTemplates;

const getEntities = createSelector(
  getRetroTemplates,
  (retroTemplates) => retroTemplates.entities
);

const getCurrId = createSelector(
  getRetroTemplates,
  (retroTemplates) => retroTemplates.retroTemplateId
);

const getIdsList = createSelector(
  getRetroTemplates,
  (retroTemplates) => Object.keys(retroTemplates.entities)
);

const getList = createSelector(
  getEntities,
  (entities) => compact(Object.values(entities)) as TRetroTemplate[]
);

const isEmptyEntities = createSelector(
  getIdsList,
  (entitiesIds) => entitiesIds.length
);

const getById = createSelector(
  getEntities,
  (entities) => (retroTemplateId: TEntityID | undefined) => {
    if (!retroTemplateId) {
      return undefined;
    }

    return entities[retroTemplateId.toString()];
  }
);

const getActionColumn = createSelector(
  getById,
  (getByIdSelectors) => (retroTemplateId: TEntityID | undefined) => {
    const retroTemplate = getByIdSelectors(retroTemplateId);

    if (!retroTemplate || !retroTemplate.columns.length) {
      return;
    }

    return retroTemplate.columns.find((column) => column.isAction);
  }
);

const getActionColumnId = createSelector(
  getActionColumn,
  (getActionColumnSelectors) => (retroTemplateId: TEntityID | undefined) => {
    if (!retroTemplateId) {
      return;
    }

    const actionColumn = getActionColumnSelectors(retroTemplateId);

    if (!actionColumn) {
      return;
    }

    return actionColumn._id;
  }
);

const getColumnsList = createSelector(
  getList,
  (retroTemplates) => {
    if (!retroTemplates.length) {
      return [];
    }

    return flatten(retroTemplates.map((retroTemplate) => retroTemplate.columns)) as TRetroColumn[];
  }
);

const getActionColumnsIds = createSelector(
  getColumnsList,
  (retroColumns: TRetroColumn[]) => {
    if (!retroColumns.length) {
      return [];
    }

    const actionColumnsIds = retroColumns.filter((column) => column.isAction)
      .map((column) => column._id);

    return actionColumnsIds;
  }
);

const getCurrRetroTemplate = createSelector(
  [
    getEntities,
    getCurrId,
  ],
  (entities, retroTemplateId) => entities[retroTemplateId.toString()]
);

const getColumns = createSelector(
  getCurrRetroTemplate,
  (retroTemplate) => {
    if (!retroTemplate) {
      return [];
    }

    return retroTemplate.columns;
  }
);

const getColumnsIds = createSelector(
  getCurrRetroTemplate,
  (retroTemplate) => {
    if (!retroTemplate || !retroTemplate.columns.length) {
      return [];
    }

    return retroTemplate.columns.map((column) => column._id.toString());
  }
);

const getColumnById = createSelector(
  getCurrRetroTemplate,
  (retroTemplate) => (columnId: TEntityID) => {
    if (!retroTemplate || !retroTemplate.columns) {
      return undefined;
    }

    return retroTemplate.columns.find((column) => isEqualsId(column._id, columnId));
  }
);

const getIsColumnActionById = createSelector(
  [getColumnById],
  (getColumnByIdSelector) => (columnId: TEntityID) => {
    const column = getColumnByIdSelector(columnId);

    if (!column) {
      return false;
    }

    return !!column.isAction;
  }
);

const getColumnsIdsWithoutAction = createSelector(
  getCurrRetroTemplate,
  (retroTemplate) => {
    if (!retroTemplate || !retroTemplate.columns.length) {
      return [];
    }

    return retroTemplate.columns.filter((column) => !column.isAction)
      .map((column) => column._id.toString());
  }
);

const getColumnIdsById = createSelector(
  getById,
  (getByIdSelector) => (retroTemplateId: TEntityID | undefined) => {
    if (!retroTemplateId) {
      return [];
    }

    const retroTemplate = getByIdSelector(retroTemplateId);

    if (!retroTemplate || !retroTemplate.columns.length) {
      return [];
    }

    return retroTemplate.columns.map((column) => column._id.toString());
  }
);

export const retroTemplatesSelectors = {
  getEntities,
  getIdsList,
  getById,
  isEmptyEntities,
  getColumns,
  getColumnsIds,
  getColumnById,
  getCurrId,
  getIsColumnActionById,
  getList,
  getColumnsList,
  getActionColumnsIds,
  getActionColumnId,
  getColumnsIdsWithoutAction,
  getColumnIdsById,
};
