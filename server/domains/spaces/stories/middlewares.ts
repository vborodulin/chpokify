import { coreSchemas } from '@chpokify/api-schemas';
import { isEqualsId } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { TSpaceDocument } from '@models/space';
import { StoryModel } from '@models/story';

const withStory = createHandler(async (
  req: TAppRequest<{ storyId: string }>,
  res
) => {
  const { storyId } = req.params;
  const space = res.locals.get('space') as TSpaceDocument;
  const story = await StoryModel.findById(storyId);

  const { error } = coreSchemas.ObjectIdSchema.validate(storyId);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'storyId'],
        message: transServer.t('errors.story.invalidId'),
      },
    ]);
  }

  if (!story || !isEqualsId(story.spaceId, space._id)) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.storyNotFound'),
        path: ['params', 'storyId'],
      },
    ]);
  }

  res.locals.set('story', story);
});

const storiesMiddleware = {
  withStory,
};

export {
  storiesMiddleware,
};
