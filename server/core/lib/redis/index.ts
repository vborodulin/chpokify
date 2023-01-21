import Redis from 'ioredis';

import { log } from '@core/lib/logger';

const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number.parseInt(process.env.REDIS_PORT as string, 10),
});

log.info({ methodName: 'redis.connect' }, 'redis connected');

export { redis };
