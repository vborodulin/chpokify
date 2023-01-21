import { pokerSessionsSchemas } from '@chpokify/api-schemas';
import { PokerSessionService } from '@pokerSessions/services/PokerSession';
import { jiraQueue } from '@queue';

import { createHandler } from '@core/middleware/createHandler';
import { QUEUE_JOB_NAME, TAppRequest, TAppResponse } from '@core/types';

import { TPokerSessionDocument } from '@models/pokerSession';
import { TStoryDocument } from '@models/story';

const chooseCard = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TChooseCardsBodyReq>,
  res: TAppResponse<pokerSessionsSchemas.TChooseCardsResResp>
) => {
  const { jiraIntegrations } = req.user;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const {
    user,
    body: {
      teamId,
      cardId,
    },
  } = req;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);

  await pokerSessionService.chooseCard({
    userId: user._id,
    teamId,
    storyId: story._id,
    cardId,
  });

  if (pokerSession.isAutoReveal) {
    jiraQueue.add(QUEUE_JOB_NAME.JIRA_SET_FIELD_ISSUE, {
      pokerSession,
      story,
      jiraIntegrations,
    });
  }

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const playControllers = {
  chooseCard,
};

export { playControllers };
