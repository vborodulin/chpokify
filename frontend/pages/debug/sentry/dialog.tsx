import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';

import { reduxWrapper } from '@Redux/lib/configureStore';

import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { Button } from '@components/uiKit/Button';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';
import { Text } from '@components/uiKit/Text';

import { LOCALE, TRANS } from '@components/utils/types';

const DialogPage = () => {
  const [hasError, setHasError] = useState<boolean>();

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Boom!');
  }

  return (
    <PageLayout>
      <ChpokifyHelmet>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </ChpokifyHelmet>

      <ContentCenter>
        <Text
          as="h1"
          fontSize={3}
        >
          <Button
            onClick={handleClick}
          >
            Throw error
          </Button>
        </Text>
      </ContentCenter>
    </PageLayout>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(() => async (ctx) =>
  ({
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  }));
export default DialogPage;
