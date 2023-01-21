import Bunyan from 'bunyan';

import { options } from './options';

const log = new Bunyan(options);

export { log };
