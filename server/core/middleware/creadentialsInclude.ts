import { createHandler } from '@core/middleware/createHandler';

export const credentialsIncludeMiddleware = createHandler((
  req,
  res
) => {
  res.set('credentials', 'include');
});
