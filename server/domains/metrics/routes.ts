import { Router } from 'express';

import { metricsController } from '@metrics/controllers';

const metricsRouter = Router();

metricsRouter.get('/check', metricsController.check);

metricsRouter.get('/prom', metricsController.getPromMetrics);

metricsRouter.get('/debug-sentry', metricsController.debugSentry);

export { metricsRouter };
