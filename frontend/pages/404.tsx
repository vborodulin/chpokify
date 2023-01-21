import React from 'react';

import { NotFound } from '@components/domains/layouts/NotFound';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { PageLayout } from '@components/uiKit/PageLayout';

const Custom404Page = () => (
  <>
    <ChpokifyHelmet>
      <meta
        name="robots"
        content="noindex, nofollow"
      />
    </ChpokifyHelmet>

    <PageLayout>
      <NotFound />
    </PageLayout>

  </>
);

export default Custom404Page;
