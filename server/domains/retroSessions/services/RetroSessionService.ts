import { TEntityID, TInviteRetroSessionTokenPayload } from '@chpokify/models-types';

import { jwtToken } from '@core/lib/jwtToken';

import { TRetroSessionDocument } from '@models/retroSession';
import { TSpaceDocument } from '@models/space';

class RetroSessionService {
  public constructor(private retroSession: TRetroSessionDocument) {
  }

  public genInviteToken(space: TSpaceDocument, teamsIds: TEntityID[]) {
    const spaceId = space._id;

    const teams = space.teams.filter((team) => teamsIds.includes(team._id.toString()));

    const payload: TInviteRetroSessionTokenPayload = {
      spaceId,
      teams,
      retroSessionId: this.retroSession._id,
    };

    return jwtToken.signInInviteToken(payload);
  }
}

export {
  RetroSessionService,
};
