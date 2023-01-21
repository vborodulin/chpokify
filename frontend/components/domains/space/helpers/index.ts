import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import nextCookies from 'next-cookies';
import Router from 'next/router';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActions } from '@Redux/domains/spaces/actions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { TAppStore } from '@Redux/types';

import { COOKIES_KEYS, SIGN_UP_MARKER } from '@components/domains/core/types';

import { signUpMarker } from '@Next/ssr/helpers';

import { setCurrSSRRequest, setCurrSSRResponse } from '@lib/api';

const redirectPageBySignUpMark = async (spaceId:TEntityID) => {
  const signUpMark = signUpMarker.getMark();

  if (signUpMark) {
    switch (signUpMark) {
      case SIGN_UP_MARKER.RETRO:
        await Router.push(
          routing.getRetroUrlTemplate(),
          routing.getRetroUrl(spaceId)
        );
        break;
      case SIGN_UP_MARKER.KANBAN:
        await Router.push(
          routing.getKanbanUrlTemplate(),
          routing.getKanbanUrl(spaceId)
        );
        break;
      default:
        break;
    }

    signUpMarker.removeMark();
  } else {
    await Router.push(
      routing.getSpaceUrlTemplate(),
      routing.getSpaceUrl(spaceId)
    );
  }
};

const redirectPageToLastSpace = (reduxStore: TAppStore, ctx: GetServerSidePropsContext):
  GetServerSidePropsResult<{}> | undefined => {
  const {
    locale,
    defaultLocale,
  } = ctx;
  const { getState } = reduxStore;
  const isLoggedIn = authSelectors.getIsLoggedIn(getState());

  const currSpaceIdFromStorage = nextCookies(ctx)[COOKIES_KEYS.CURRENT_SPACE_ID];
  const lastUsedSpace = spacesSelectors.getLastUsed(
    getState()
  )(currSpaceIdFromStorage);

  if (isLoggedIn) {
    let redirectUrl = '';

    if (lastUsedSpace) {
      redirectUrl = routing.getSpaceUrl(lastUsedSpace._id);
    } else {
      redirectUrl = routing.getSpacesChooseUrl();
    }

    const currentLocale = locale === defaultLocale
      ? ''
      : `/${locale}`;

    return {
      redirect: {
        permanent: false,
        destination: `${currentLocale}${redirectUrl}`,
      },
    };
  }
};

const initPage = (
  reduxStore: TAppStore,
  ctx: GetServerSidePropsContext
):void => {
  const {
    query,
  } = ctx;

  setCurrSSRRequest(ctx.req);
  setCurrSSRResponse(ctx.res);

  const {
    dispatch,
    getState,
  } = reduxStore;

  const spaceId = Array.isArray(query.spaceId) ? query.spaceId[0] : query.spaceId;
  const currSpaceId = spacesSelectors.getCurrSpaceId(getState());

  if (spaceId && !isEqualsId(currSpaceId, spaceId)) {
    dispatch(spacesActions.setCurrId(spaceId));
  }
};

const spaceHelpers = {
  redirectPageToLastSpace,
  initPage,
  redirectPageBySignUpMark,
};

export {
  spaceHelpers,
};
