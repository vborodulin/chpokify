import fs from 'fs';
import path from 'path';

const enhanceKey = (key: string): string => key.replace(/\\n/gm, '\n');

const privateKey = fs.readFileSync(path.resolve(__dirname, './jira_privatekey.pem'), {
  encoding: 'utf8',
});

const publicKey = fs.readFileSync(path.resolve(__dirname, './jira_publickey.pem'), {
  encoding: 'utf8',
});

const jiraKeys = {
  privateKey: enhanceKey(privateKey),
  publicKey: enhanceKey(publicKey),
};

export {
  jiraKeys,
};
