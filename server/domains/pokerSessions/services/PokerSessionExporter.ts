import { dateHelpers } from '@chpokify/helpers';
import { pokerSessionHelpers } from '@chpokify/helpers/pokerSession';
import { format as formatCSV } from '@fast-csv/format';
import { paramCase } from 'change-case';
import { keyBy } from 'lodash';

import { TAppResponse } from '@core/types';

import { TPokerSessionDocument } from '@models/pokerSession';
import { TSpaceDocument } from '@models/space';
import { StoryModel } from '@models/story';

class PokerSessionExporter {
  public constructor(
    private pokerSession: TPokerSessionDocument,
    private space: TSpaceDocument
  ) {
  }

  private async getData() {
    const { results } = this.pokerSession;

    const teamsMap = keyBy(this.space.teams, '_id');

    const stories = await StoryModel.find({
      _id: Object.keys(results),
    });
    const storiesMap = keyBy(stories, '_id');

    const arrData: Record<string, any>[] = [];

    Object.entries(results).forEach(([storyId, storyResult]) => {
      const story = storiesMap[storyId];

      if (!story) {
        return;
      }

      const row: Record<string, any> = {
        storyName: story.title,
        storyDuration: dateHelpers.formatSeconds(storyResult.duration),
      };

      Object.values(storyResult.teamsResult).forEach((teamResult) => {
        const team = teamsMap[teamResult.teamId.toString()];

        if (!team) {
          return;
        }

        row[team.name] = teamResult.scores;
      });

      arrData.push(row);
    });

    return arrData;
  }

  public getFilename(ext: string) {
    return `${paramCase(
      pokerSessionHelpers.getExportFilename(this.pokerSession.title)
    )}.${ext}`;
  }

  private createCSVStream() {
    return formatCSV({
      headers: true,
      objectMode: true,
    });
  }

  public async exportCSV(res: TAppResponse) {
    const data = await this.getData();

    const csvStream = this.createCSVStream();
    csvStream.pipe(res);

    data.forEach((row) => {
      csvStream.write(row);
    });

    csvStream.end();
  }
}

export {
  PokerSessionExporter,
};
