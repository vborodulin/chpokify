import Polyglot from 'node-polyglot';

import serverEn from './server_en.json';

const transServer = new Polyglot({
  phrases: serverEn,
});

export {
  transServer,
};
