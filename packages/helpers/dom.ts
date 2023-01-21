const SCROLL_BLOCK_ATTR = 'scrollLocked';

const preventBodyScrollEnable = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.setAttribute(SCROLL_BLOCK_ATTR, 'true');
};

const preventBodyScrollDisable = () => {
  const scrollY = document.body.style.top;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.marginRight = 'unset';

  window.scrollTo(0, Number.parseInt(scrollY || '0', 10) * -1);

  document.body.removeAttribute(SCROLL_BLOCK_ATTR);
};

const getIsBodyScrollLocked = () => !!document.body.getAttribute(SCROLL_BLOCK_ATTR);

const makeActionWhenDisapear = (selector: string, action: () => void) => {
  const el = document.querySelector(selector);

  if (!el) {
    action();
    return;
  }

  setTimeout(() => {
    makeActionWhenDisapear(selector, action);
  }, 200);
};

const makeActionWhenAppear = (selector: string, action: () => void) => {
  const el = document.querySelector(selector);

  if (el) {
    action();
    return;
  }

  setTimeout(() => {
    makeActionWhenAppear(selector, action);
  }, 200);
};

const hideElement = (selector: string) => {
  const el = document.querySelector(selector) as HTMLElement;

  if (el) {
    el.style.display = 'none';
  }
};

const openNewTab = (url: string, wPercent: number, hPercent: number) => {
  // eslint-disable-next-line no-restricted-globals
  // @ts-ignore
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen?.left;
  // eslint-disable-next-line no-restricted-globals
  // @ts-ignore
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen?.top;

  // eslint-disable-next-line no-nested-ternary
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  // eslint-disable-next-line no-nested-ternary
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen?.height;

  const w = (window.screen.width * wPercent) / 100;
  const h = (window.screen.height * hPercent) / 100;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;

  const newWindow = window.open(
    url,
    'Private Lesson',
    `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
  );

  // @ts-ignore
  if (window?.focus) {
    // eslint-disable-next-line no-unused-expressions
    newWindow?.focus();
  }

  return newWindow;
};

const downloadFile = (blob: Blob, filename: string, phrase: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  // the filename you want
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  alert(phrase); // or you know, something with better UX...
};

const preventEvent = (event: Event) => {
  event.preventDefault();
};

const getElementClassSelector = (el: HTMLElement) =>
  `.${Array.from(el.classList).join('.')}`;

const domHelpers = {
  preventBodyScrollEnable,
  preventBodyScrollDisable,
  getIsBodyScrollLocked,
  makeActionWhenDisapear,
  makeActionWhenAppear,
  hideElement,
  openNewTab,
  downloadFile,
  preventEvent,
  getElementClassSelector,
};

export {
  domHelpers,
};
