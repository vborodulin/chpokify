/**
 * static
 *
 */

import { isEqualsId } from '@chpokify/helpers';
import { SPACE_PARTICIPANT_ROLE, TEntityID, TParticipant } from '@chpokify/models-types';
import { ObjectId } from 'bson';
import jdenticon from 'jdenticon';
import mongoose from 'mongoose';

import { TSpaceModel } from '@models/space/index';

import { SpaceService } from '@spaces/services';

function createNew(this: TSpaceModel, userId: ObjectId, name: string) {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    name,
    generatedAvatarSvg: encodeURI(jdenticon.toSvg(name, 200)),
    teams: [],
    participants: [{
      _id: new ObjectId(),
      userId,
      role: SPACE_PARTICIPANT_ROLE.ADMIN,
    }],
  });
}

async function findWhereParticipant(this: TSpaceModel, userId: ObjectId) {
  return this.find({
    participants: {
      $elemMatch: { userId },
    },
  });
}

async function removeParticipantFromSpaces(this: TSpaceModel, userId: TEntityID) {
  const spaces = await this.find({
    participants: {
      $elemMatch: { userId },
    },
  });
  if (!spaces.length) return;

  // eslint-disable-next-line no-restricted-syntax
  for await (const space of spaces) {
    const spaceService = new SpaceService(space);
    const participant = space.participants.find((el) => isEqualsId(el.userId, userId)) as TParticipant;
    // eslint-disable-next-line no-await-in-loop
    await spaceService.removeParticipant(participant._id);
  }
}

const spaceSchemaStatics = {
  createNew,
  findWhereParticipant,
  removeParticipantFromSpaces,
};

export {
  spaceSchemaStatics,
};
