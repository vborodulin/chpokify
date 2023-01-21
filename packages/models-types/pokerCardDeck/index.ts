import { TEntityID } from '@chpokify/models-types';

export type TPokerCardDeckScores = number | null;

export enum POKER_CARD_DECK_TYPE {
  TEXT,
  ICON
}

export const CARD_DECK_TITLE_MIN_LENGTH = 3;
export const CARD_DECK_TITLE_MAX_LENGTH = 150;
export const CARD_DECK_VALUE_MAX_LENGTH = 999;

export type TPokerCard = {
  _id: TEntityID;
  value: TPokerCardDeckScores;
  default?: boolean
} & ({
  type: POKER_CARD_DECK_TYPE.TEXT,
  name: string;
} | {
  type: POKER_CARD_DECK_TYPE.ICON,
  icon: string;
});

export type TPokerCardDeck = {
  title: string;
  cards: TPokerCard[];
  spaceId: TEntityID,
  _id: TEntityID;
  default?: boolean,
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: string;
  deletedAt?: string;
}
