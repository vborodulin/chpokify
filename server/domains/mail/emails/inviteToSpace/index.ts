import fs from 'fs';
import path from 'path';

import { getEmailContent } from '@mail/emails/getEmailContent';

const html = fs.readFileSync(path.resolve(__dirname, 'content.html'), {
  encoding: 'utf8',
});
const txt = fs.readFileSync(path.resolve(__dirname, 'content.txt'), {
  encoding: 'utf8',
});

const getInviteToSpaceEmailContent = (spaceName: string, inviteUrl: string) => getEmailContent(
  txt,
  html,
  {
    spaceName,
    action_url: inviteUrl,
  }
);

export {
  getInviteToSpaceEmailContent,
};
