import { teamsSchemas } from '@chpokify/api-schemas';
import { PokerSessionService } from '@pokerSessions/services/PokerSession';
import Bluebird from 'bluebird';
import { ObjectID } from 'bson';

import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { PokerSessionModel } from '@models/pokerSession';
import { TSpaceDocument, TTeamDocument } from '@models/space';

const create = createHandler(async (
  req: TAppRequest<{}, teamsSchemas.TCreateBodyReq>,
  res: TAppResponse<teamsSchemas.TCreateResResp>
) => {
  const {
    _id,
    name,
    participantsIds,
  } = req.body;
  const space = res.locals.get('space') as TSpaceDocument;

  const team = space.teams.create({
    _id: _id || new ObjectID(),
    name,
    participantsIds,
  });
  space.teams.push(team);

  await space.save();

  res.locals.result = {
    space,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, teamsSchemas.TUpdateBodyReq>,
  res: TAppResponse<teamsSchemas.TUpdateResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const team = res.locals.get('team') as TTeamDocument;

  team.set(req.body);
  await space.save();

  res.locals.result = {
    space,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<teamsSchemas.TDeleteResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const team = res.locals.get('team') as TTeamDocument;

  await team.remove();
  await space.save();

  const pokerSessions = await PokerSessionModel.findByTeamId(team._id);

  await Bluebird.map(pokerSessions, async (pokerSession) => {
    const pokerSessionService = new PokerSessionService(pokerSession);
    pokerSessionService.removeTeam(team._id);
    await pokerSession.save();
  }, {
    concurrency: 10,
  });

  res.locals.result = {
    space,
  };
});

const teamsControllers = {
  create,
  update,
  remove,
};

export {
  teamsControllers,
};
