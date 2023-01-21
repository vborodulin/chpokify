import { isServer } from '@chpokify/helpers';

type TGTMPageEvent = {
  event: string;
  page: string;
}

const GTMPageView = (url: string) => {
  if (isServer()) {
    return;
  }

  const pageEvent: TGTMPageEvent = {
    event: 'pageview',
    page: url,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(pageEvent);
  return pageEvent;
};

export {
  GTMPageView,
};
