import { TEntityID } from '@chpokify/models-types';
import { PokerSessionService } from '@pokerSessions/services/PokerSession';
import config from 'config';

import { PokerSessionModel, TPokerSessionDocument } from '@models/pokerSession';

const POKER_SESSION_USER_REMOVE_ONLINE_INTERVAL = config.get('poker.userRemoveOnlineInterval') as number;

class UsersInSessions {
  private timers: Record<string, NodeJS.Timeout> = {};

  private getTimerKey(pokerSessionId: TEntityID, userId: TEntityID): string {
    return `${pokerSessionId}:${userId}`;
  }

  private removeTimer(pokerSessionId: TEntityID, userId: TEntityID) {
    const timerKey = this.getTimerKey(pokerSessionId, userId);
    const timerId = this.timers[timerKey];
    global.clearTimeout(timerId);
  }

  private async runTimeoutRemoveUserFromSession(pokerSessionId: TEntityID, userId: TEntityID) {
    this.removeTimer(pokerSessionId, userId);

    const timerKey = this.getTimerKey(pokerSessionId, userId);

    this.timers[timerKey] = global.setTimeout(async () => {
      const pokerSession = await PokerSessionModel.findById(pokerSessionId);

      if (!pokerSession) {
        return;
      }

      const pokerSessionService = new PokerSessionService(pokerSession);
      await pokerSessionService.removeUserFromSession(userId);

      await pokerSession.save();
    }, POKER_SESSION_USER_REMOVE_ONLINE_INTERVAL);
  }

  public async setInSession(pokerSession: TPokerSessionDocument, userId: TEntityID) {
    const pokerSessionService = new PokerSessionService(pokerSession);
    await pokerSessionService.setUserInSession(userId);

    if (pokerSession.isModified()) {
      await pokerSession.save();
    }

    await this.runTimeoutRemoveUserFromSession(pokerSession._id, userId);
  }
}

const usersInSessions = new UsersInSessions();

export {
  usersInSessions,
};
