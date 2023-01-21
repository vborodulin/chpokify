import { arrayHelpers } from '@chpokify/helpers';
import { TStory, TEntityID } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { StoryModel, TStoryModel } from '@models/story';

/**
 * static
 */
function createNew(
  this: TStoryModel,
  spaceId: TEntityID,
  other: Partial<TStory>
) {
  return new this({
    ...other,
    _id: new mongoose.Types.ObjectId(),
    spaceId,
  });
}

async function getNextId(this: TStoryModel, spaceId: TEntityID) {
  const findStory = await this.find({ spaceId }, ['id'])
    .sort({ id: -1 })
    .limit(1) as TStory[];

  if (!arrayHelpers.isEmptyArr(findStory)) {
    const [story] = findStory;
    return Number(story.id) + 1;
  }

  return 1;
}

async function upsertManyFromJira(this: TStoryModel, stories: Omit<TStory, '_id' | 'id'>[]) {
  const storyJiraDataSelf = stories.map((el) => el.jiraData?.self);

  // eslint-disable-next-line no-restricted-syntax
  for await (const story of stories) {
    if (!story.jiraData) {
      continue;
    }

    const findStory = await this.findOne({
      'jiraData.self': story.jiraData.self,
    });

    if (!findStory) {
      const id = await StoryModel.getNextId(story.spaceId);
      await new this({
        ...story,
        id,
      }).save();
    } else {
      await this.updateOne({ 'jiraData.self': story.jiraData.self }, story);
    }
  }

  return this.find({ 'jiraData.self': { $in: storyJiraDataSelf } });
}

const storySchemaStatics = {
  upsertManyFromJira,
  getNextId,
  createNew,
};

export {
  storySchemaStatics,
};
