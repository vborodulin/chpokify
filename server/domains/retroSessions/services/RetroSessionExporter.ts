import { retroSessionHelpers } from '@chpokify/helpers';
import { RetroTemplatesService } from '@domains/retroTemplates/services';
import { format as formatCSV } from '@fast-csv/format';
import { paramCase } from 'change-case';

import { TAppResponse } from '@core/types';

import { RetroCardModel } from '@models/retroCard';
import { RetroRelationsModel } from '@models/retroRelations';
import { TRetroSessionDocument } from '@models/retroSession';
import { RetroTemplateModel } from '@models/retroTemplate';

class RetroSessionExporter {
  public constructor(
    private retroSession: TRetroSessionDocument
  ) {
  }

  private async getData() {
    const { templateId } = this.retroSession;

    const retroSessionTemplate = await RetroTemplateModel.findById(templateId);

    if (!retroSessionTemplate) {
      return [];
    }

    const retroTemplatesService = new RetroTemplatesService(retroSessionTemplate);
    const retroColumnActions = retroTemplatesService.getActionColumn();

    if (!retroColumnActions) {
      return [];
    }

    const retroRelation = await RetroRelationsModel.findOne(
      {
        templateId,
        columnId: retroColumnActions._id,
      },
      ['cardsIds']
    );

    if (!retroRelation || !retroRelation.cardsIds.length) {
      return [];
    }

    const retroCards = await RetroCardModel.find(
      { _id: { $in: retroRelation.cardsIds } },
      ['-_id', 'title', 'isCompleted']
    );

    if (!retroCards.length) {
      return [];
    }

    const arrDataDownload: Record<string, any>[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const retroCard of retroCards) {
      arrDataDownload.push({
        cardName: retroCard.title,
        isCompleted: retroCard.isCompleted,
      });
    }

    return arrDataDownload;
  }

  public getFilename(ext: string) {
    return `${paramCase(
      retroSessionHelpers.getExportFilename(this.retroSession.title)
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
  RetroSessionExporter,
};
