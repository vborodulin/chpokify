import { TEntityID, TSpace } from '@chpokify/models-types';

const RETRO_SESSION_TITLE_MIN_LENGTH = 3;
const RETRO_SESSION_TITLE_MAX_LENGTH = 50;

const RETRO_SESSION_DESC_MIN_LENGTH = 3;
const RETRO_SESSION_DESC_MAX_LENGTH = 150;

const RETRO_COLUMN_TITLE_MIN_LENGTH = 3;
const RETRO_COLUMN_TITLE_MAX_LENGTH = 50;

const RETRO_CARD_TITLE_MIN_LENGTH = 1;
const RETRO_CARD_TITLE_MAX_LENGTH = 1000;

const RETRO_CARD_DESCRIPTION_MAX_LENGTH = 1000;

const RETRO_MAX_VOTES_CARD_PER_USER = 6;

enum RETRO_TEMPLATE_COLUMNS_NAME {
  START = 'Start',
  STOP = 'Stop',
  CONTINUE = 'Continue',
  MAD = 'Mad',
  SAD = 'Sad',
  GLAD = 'Glad',
  WENT_WELL = 'What went well?',
  GO_WELL = 'What didn’t go well?',
  ACTIONS = 'Actions',
  MY_FIRST_RETRO = 'My first retro'
}

enum RETRO_TEMPLATE_TYPE {
  CUSTOM = 'custom',
  START_STOP_CONTINUE = 'startStopContinue',
  MAD_SAD_GLAD = 'madSadGlad',
  WENT_WELL_GO_WELL = 'wentWellGoWell',
}

type TRetroSession = {
  _id: TEntityID;
  title: string;
  description: string;
  spaceId: TEntityID;
  userId: TEntityID;
  templateId: TEntityID;
  teamsIds: TEntityID[];
  maxVotesCard: number,
  isHiddenCards?: boolean,
  isHiddenUserNameCards?: boolean,
  isHiddenVoteCountCards?: boolean,
  isDisableVotingCards?: boolean,
  isHiddenDescriptionCards?: boolean,
  isOneVoteCards?: boolean,
  isSortByVotesCount?: boolean,
  canEditCards?: boolean,
  canMoveCards?: boolean,
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

type TRetroTemplate = {
  _id: TEntityID;
  columns: TRetroColumn[],
  type: RETRO_TEMPLATE_TYPE,
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

type TRetroColumn = {
  _id: TEntityID;
  title: string;
  isAction?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

type TRetroCard = {
  _id: TEntityID;
  title: string;
  description: string;
  spaceId: TEntityID;
  userId: TEntityID;
  votes: TEntityID[];
  combinedCards: Omit<TRetroCard, 'combinedCards'>[];
  isCompleted?: boolean
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

type TRetroRelations = {
  _id: TEntityID;
  templateId: TEntityID;
  columnId: TEntityID;
  cardsIds: TEntityID[];
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

type TRetroTemplateData = Record<RETRO_TEMPLATE_TYPE, {
  type: TRetroTemplate['type'];
}>

type TInviteRetroSessionTokenPayload = {
  spaceId: TEntityID;
  teams: TSpace['teams'];
  retroSessionId: TEntityID;
};

export {
  RETRO_SESSION_TITLE_MIN_LENGTH,
  RETRO_SESSION_TITLE_MAX_LENGTH,
  RETRO_CARD_DESCRIPTION_MAX_LENGTH,
  RETRO_SESSION_DESC_MIN_LENGTH,
  RETRO_SESSION_DESC_MAX_LENGTH,
  RETRO_COLUMN_TITLE_MIN_LENGTH,
  RETRO_COLUMN_TITLE_MAX_LENGTH,
  RETRO_CARD_TITLE_MIN_LENGTH,
  RETRO_CARD_TITLE_MAX_LENGTH,
  RETRO_TEMPLATE_TYPE,
  RETRO_TEMPLATE_COLUMNS_NAME,
  RETRO_MAX_VOTES_CARD_PER_USER,
};

export type{
  TRetroSession,
  TRetroTemplate,
  TRetroColumn,
  TRetroCard,
  TRetroRelations,
  TRetroTemplateData,
  TInviteRetroSessionTokenPayload,
};
