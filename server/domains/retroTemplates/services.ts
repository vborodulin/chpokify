import { transServer } from '@chpokify/i18n';
import {
  RETRO_TEMPLATE_TYPE,
  RETRO_TEMPLATE_COLUMNS_NAME,
  TRetroColumn,
} from '@chpokify/models-types';

import { BadRequestError, ERROR_CODES } from '@core/lib/errors';

import { TRetroTemplateDocument } from '@models/retroTemplate';

class RetroTemplatesService {
  private readonly retroColumnsLength: number = 0;

  public constructor(private retroTemplate: TRetroTemplateDocument) {
    this.retroColumnsLength = retroTemplate.columns.length;
  }

  public getActionColumn():TRetroColumn | undefined {
    return this.retroTemplate.columns.find((column) => column.isAction);
  }

  public createColumn(column: Partial<TRetroColumn>):TRetroColumn {
    const newColumn = this.retroTemplate.columns.create(column);

    if (column.isAction) {
      this.retroTemplate.columns.push(newColumn);
    } else {
      this.retroTemplate.columns.splice(this.retroColumnsLength - 1, 0, newColumn);
    }

    return newColumn;
  }

  public createColumns(type: RETRO_TEMPLATE_TYPE) {
    switch (type) {
      case RETRO_TEMPLATE_TYPE.CUSTOM:
        return this.createColumnsByListName([
          RETRO_TEMPLATE_COLUMNS_NAME.MY_FIRST_RETRO,
        ]);
      case RETRO_TEMPLATE_TYPE.START_STOP_CONTINUE:
        return this.createColumnsByListName([
          RETRO_TEMPLATE_COLUMNS_NAME.START,
          RETRO_TEMPLATE_COLUMNS_NAME.STOP,
          RETRO_TEMPLATE_COLUMNS_NAME.CONTINUE,
        ]);
      case RETRO_TEMPLATE_TYPE.MAD_SAD_GLAD:
        return this.createColumnsByListName([
          RETRO_TEMPLATE_COLUMNS_NAME.MAD,
          RETRO_TEMPLATE_COLUMNS_NAME.SAD,
          RETRO_TEMPLATE_COLUMNS_NAME.GLAD,
        ]);
      case RETRO_TEMPLATE_TYPE.WENT_WELL_GO_WELL:
        return this.createColumnsByListName([
          RETRO_TEMPLATE_COLUMNS_NAME.WENT_WELL,
          RETRO_TEMPLATE_COLUMNS_NAME.GO_WELL,
        ]);

      default: {
        throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
          {
            message: transServer.t('errors.retroSessionTemplate.invalidType'),
            path: ['type'],
          },
        ]);
      }
    }
  }

  private createColumnsByListName(titles: RETRO_TEMPLATE_COLUMNS_NAME[]) {
    if (!titles.length) {
      return;
    }

    this.createColumn({
      title: RETRO_TEMPLATE_COLUMNS_NAME.ACTIONS,
      isAction: true,
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const title of titles) {
      this.createColumn({ title });
    }
  }
}

export { RetroTemplatesService };
