import { isServer } from '@chpokify/helpers';
import Bowser from 'bowser';

let userAgent = 'default';

try {
  userAgent = window.navigator.userAgent;
} catch (err) {
  // do nothing
}

const bowser = Bowser.getParser(userAgent, !isServer());

const getIsMobile = () => bowser.getPlatformType(true) === 'mobile';
const getIsDesktop = () => bowser.getPlatformType(true) === 'desktop';

const getIsDarkModePreferred = () => {
  if (isServer()) {
    return false;
  }

  try {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch {
    return false;
  }
};

const getIsTouchEnabled = () => {
  if (isServer()) {
    return false;
  }

  return ('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0);
};

const getDPR = () => {
  if (isServer()) {
    return 1;
  }

  return window.devicePixelRatio;
};

const getIsWakeLockSupported = () => 'wakeLock' in navigator;

const isChpokifyIOSApp = userAgent.match(/chpokify-ios-app/ig);

export const detect = {
  getIsMobile,
  getIsDesktop,
  getIsDarkModePreferred,
  getIsTouchEnabled,
  getDPR,
  getIsWakeLockSupported,
  isChpokifyIOSApp,
};
