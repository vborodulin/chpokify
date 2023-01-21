import { ClientError } from '@lib/errors';

const ThrowErrorPage = () => {
  throw new ClientError('sentry debug render error', [
    {
      path: [],
      message: 'sentry debug message',
    },
  ]);
};

export default ThrowErrorPage;
