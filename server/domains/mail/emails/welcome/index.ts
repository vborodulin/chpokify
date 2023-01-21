import fs from 'fs';
import path from 'path';

import { getEmailContent } from '@mail/emails/getEmailContent';

const html = fs.readFileSync(path.resolve(__dirname, 'content.html'), {
  encoding: 'utf8',
});

export type TGetWelcomeEmailContentData = {
  username: string,
  guideUrl: string,
  jiraConnectUrl: string,
  upgradeUrl: string,
  facebookUrl: string,
  youtubeUrl: string,
  supportEmail: string
};

const getWelcomeEmailContent = (data: TGetWelcomeEmailContentData) => getEmailContent(
  '',
  html,
  data
);

export {
  getWelcomeEmailContent,
};
