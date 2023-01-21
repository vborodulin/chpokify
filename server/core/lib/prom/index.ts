import promClient from 'prom-client';

const register = new promClient.Registry();

register.setDefaultLabels({
  app: 'chpokify-server',
});

promClient.collectDefaultMetrics({
  register,
});

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_microseconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

register.registerMetric(httpRequestDurationMicroseconds);

export {
  register,
  httpRequestDurationMicroseconds,
};
