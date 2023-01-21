import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { reduxWrapper } from '@Redux/lib/configureStore';

import { KeepmailCallback } from '@components/domains/auth/KeepmailCallback';

import { LOCALE, TRANS } from '@components/utils/types';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const Page = () => <KeepmailCallback />;

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default Page;
