import { TPokerCardDeck } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { pokerCardDeckSchemaStatics } from '@models/pokerCardDeck/static';

type TPokerCardDeckDocumentStatic = typeof pokerCardDeckSchemaStatics;

export type TPokerCardDeckDocument = mongoose.Document & TPokerCardDeck;

export type TPokerCardDeckModel = mongoose.Model<TPokerCardDeckDocument> & TPokerCardDeckDocumentStatic;
