import fs from 'fs';
import path from 'path';

import { getEmailContent } from '@mail/emails/getEmailContent';

const html = fs.readFileSync(path.resolve(__dirname, 'content.html'), {
  encoding: 'utf8',
});
const txt = fs.readFileSync(path.resolve(__dirname, 'content.txt'), {
  encoding: 'utf8',
});

const getResetEmailContent = (username: string, resetUrl: string) => getEmailContent(
  txt,
  html,
  {
    username,
    action_url: resetUrl,
  }
);

export {
  getResetEmailContent,
};
