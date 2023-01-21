import { SUCCESS_VOID_RESULT } from '@chpokify/api-schemas';
import { storiesSchemas } from '@chpokify/api-schemas/storiesSchemas';
import { TStory } from '@chpokify/models-types';
import { ObjectID } from 'bson';

import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { TSpaceDocument } from '@models/space';
import { StoryModel, TStoryDocument } from '@models/story';

const getList = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<storiesSchemas.TGetListResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const stories = await StoryModel.find({ spaceId: space._id })
    .sort({ id: -1 });

  res.locals.result = {
    stories,
  };
});

const getMany = createHandler(async (
  req: TAppRequest<{}, storiesSchemas.TGetManyBodyReq>,
  res: TAppResponse<storiesSchemas.TGetManyResResp>
) => {
  const { ids } = req.body;
  const space = res.locals.get('space') as TSpaceDocument;

  const objectIdIds = ids.map((id) => new ObjectID(id));

  const stories = await StoryModel.find({
    _id: {
      $in: objectIdIds,
    },
    spaceId: space._id,
  });

  res.locals.result = {
    stories,
  };
});

const create = createHandler(async (
  req: TAppRequest<{}, storiesSchemas.TCreateBodyReq>,
  res: TAppResponse<storiesSchemas.TCreateResResp>
) => {
  const { body } = req;
  const space = res.locals.get('space') as TSpaceDocument;
  const nextId = await StoryModel.getNextId(space._id);

  const story = new StoryModel({
    spaceId: space._id,
    id: nextId,
    ...body,
  });

  await story.save();

  res.locals.result = {
    story,
  };
});

const createMany = createHandler(async (
  req: TAppRequest<{}, storiesSchemas.TCreateManyBodyReq>,
  res: TAppResponse<storiesSchemas.TCreateManyResResp>
) => {
  const { body } = req;
  const space = res.locals.get('space') as TSpaceDocument;

  const stories: Pick<TStory, 'spaceId'|'title'|'id'>[] = [];

  let nextId = await StoryModel.getNextId(space._id);

  // eslint-disable-next-line no-restricted-syntax
  for (const story of body.stories) {
    stories.push({
      spaceId: space._id,
      title: story.title,
      id: nextId,
    });
    nextId++;
  }

  const createdStories = await StoryModel.create(stories);

  res.locals.result = {
    stories: createdStories,
  };
});

const get = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<storiesSchemas.TGetResResp>
) => {
  const story = res.locals.get('story') as TStoryDocument;
  res.locals.result = {
    story,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, storiesSchemas.TUpdateBodyReq>,
  res: TAppResponse<storiesSchemas.TUpdateResResp>
) => {
  const { body } = req;
  const story = res.locals.get('story') as TStoryDocument;

  story.set(body);

  await story.save();

  res.locals.result = {
    story,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<storiesSchemas.TRemoveResResp>
) => {
  const story = res.locals.get('story') as TStoryDocument;
  await story.remove();
  res.locals.result = SUCCESS_VOID_RESULT;
});

const storiesController = {
  getList,
  getMany,
  get,
  create,
  createMany,
  update,
  remove,
};

export {
  storiesController,
};
