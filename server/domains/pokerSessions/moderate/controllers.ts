import { pokerSessionsSchemas, SUCCESS_VOID_RESULT } from '@chpokify/api-schemas';
import { isEqualsId } from '@chpokify/helpers';
import { PokerSessionService } from '@pokerSessions/services/PokerSession';
import { jiraQueue } from '@queue';

import { createHandler } from '@core/middleware/createHandler';
import { QUEUE_JOB_NAME, TAppRequest, TAppResponse } from '@core/types';

import { TPokerSessionDocument } from '@models/pokerSession';
import { TStoryDocument } from '@models/story';

const update = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TUpdateBodyReq>,
  res: TAppResponse<pokerSessionsSchemas.TUpdateResResp>
) => {
  const {
    body,
  } = req;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const {
    jira,
    ...otherParams
  } = body;

  const prevTeamIds = pokerSession.teamsIds;
  const prevCardDeckId = pokerSession.cardSetId;

  pokerSession.set(otherParams);

  const pokerSessionService = new PokerSessionService(pokerSession);

  if (body.jira) {
    pokerSession.set('jira', jira);
  }

  if (body.cardSetId !== prevCardDeckId) {
    pokerSessionService.clearUsersCards();
    pokerSessionService.clearVoting();
  }

  const { teamsIds } = body;

  if (teamsIds) {
    prevTeamIds.forEach((pokerTeamId) => {
      const needRemove = !teamsIds.some((teamId) => isEqualsId(pokerTeamId, teamId));

      if (needRemove) {
        pokerSessionService.removeTeam(pokerTeamId);
      }
    });
  }

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TRemoveResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  await pokerSession.remove();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const storyAdd = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryAddResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.addStory(story._id);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storyAddMany = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TStoryAddManyReq>,
  res: TAppResponse<pokerSessionsSchemas.TStoryAddManyResResp>
) => {
  const { storiesIds } = req.body;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.addManyStories(storiesIds);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storySetMany = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TStorySetManyReq>,
  res: TAppResponse<pokerSessionsSchemas.TStorySetManyResResp>
) => {
  const { storiesIds } = req.body;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.setManyStories(storiesIds);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storiesSetSort = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TStoriesSetSortReq>,
  res: TAppResponse<pokerSessionsSchemas.TStoriesSetSortResResp>
) => {
  const { sort } = req.body;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.setSortByScores(sort);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storyRemove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryRemoveResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.removeStory(story._id);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storyStart = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryStartResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.startStory(story._id);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const storyActiveStop = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryStopResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.storyActiveStop();

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const voteAll = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryVoteAllResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);

  await pokerSessionService.voteAll(story._id);
  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const voteAllCancel = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TStoryVoteAllCancelResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.voteAllCancel(story._id);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const vote = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TStoryVoteBodyReq>,
  res: TAppResponse<pokerSessionsSchemas.TStoryVoteResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;
  const { teamId } = req.body;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.voteTeam(story._id, teamId);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const voteCancel = createHandler(async (
  req: TAppRequest<{}, pokerSessionsSchemas.TStoryVoteCancelBodyReq>,
  res: TAppResponse<pokerSessionsSchemas.TStoryVoteCancelResResp>
) => {
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;
  const { teamId } = req.body;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.voteTeamCancel(story._id, teamId);

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const revealAll = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TRevealResResp>
) => {
  const { jiraIntegrations } = req.user;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;

  const pokerSessionService = new PokerSessionService(pokerSession);
  await pokerSessionService.reveal(story._id);

  jiraQueue.add(QUEUE_JOB_NAME.JIRA_SET_FIELD_ISSUE, {
    pokerSession,
    story,
    jiraIntegrations,
  });

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const reveal = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerSessionsSchemas.TTeamRevealResResp>
) => {
  const { jiraIntegrations } = req.user;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;
  const { teamId } = req.params;

  const pokerSessionService = new PokerSessionService(pokerSession);
  await pokerSessionService.revealTeam(story._id, teamId);

  jiraQueue.add(QUEUE_JOB_NAME.JIRA_SET_FIELD_ISSUE, {
    pokerSession,
    story,
    jiraIntegrations,
  });

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const setTeamScore = createHandler(async (
  req: TAppRequest<{ teamId: string }, pokerSessionsSchemas.TTeamScoresSetBodyReq>,
  res: TAppResponse<pokerSessionsSchemas.TTeamScoresSetResResp>
) => {
  const { jiraIntegrations } = req.user;
  const pokerSession = res.locals.get('pokerSession') as TPokerSessionDocument;
  const story = res.locals.get('story') as TStoryDocument;
  const { scores } = req.body;
  const { teamId } = req.params;

  const pokerSessionService = new PokerSessionService(pokerSession);
  pokerSessionService.setTeamScore(story._id, teamId, scores);

  jiraQueue.add(QUEUE_JOB_NAME.JIRA_SET_FIELD_ISSUE, {
    pokerSession,
    story,
    jiraIntegrations,
  });

  await pokerSession.save();

  res.locals.result = {
    pokerSession,
  };
});

const moderateControllers = {
  update,
  remove,
  storyAdd,
  storyAddMany,
  storySetMany,
  storyRemove,
  storyStart,
  storyActiveStop,
  voteAll,
  voteAllCancel,
  vote,
  voteCancel,
  revealAll,
  reveal,
  setTeamScore,
  storiesSetSort,
};

export {
  moderateControllers,
};
