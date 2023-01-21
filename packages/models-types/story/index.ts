import { TEntityID } from '../core';
import { TJiraIssue } from '../core/integrations';

export const STORY_TITLE_MAX_LENGTH = 150;
export const STORY_DESCRIPTION_MAX_LENGTH = 300;

export enum STORY_SORT {
  LOW_SCORE,
  HIGH_SCORE,
}

export type TStory = {
  _id: TEntityID;
  id: Number;
  spaceId: TEntityID;
  title: string;
  description?: string;
  jiraData?: TJiraIssue;
  key?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
};
