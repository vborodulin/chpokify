// import classnames from 'classnames';
import { useEffect, useRef } from 'react';
import * as React from 'react';

// import styles from './TildaLayout.module.scss';

export type TTildaLayoutProps = {
  tildaProps: Record<string, string>;
  children: React.ReactNode;
  className?: string;
};

const WAIT_FOR_LOAD = ['jquery', 'tilda-scripts', 'tilda-blocks'];

const getIsWaitForLoadSrc = (src: string, waitForLoad: string[]) =>
  waitForLoad.some((scriptTag: string) => src.includes(scriptTag));

const insertScript = (script: HTMLScriptElement, onload?: () => void) => {
  const scriptTag = document.createElement('script');
  scriptTag.async = false;

  if (script.src) {
    scriptTag.src = script.src;
  }

  if (script.innerHTML) {
    scriptTag.innerHTML = script.innerHTML;
  }

  if (onload) {
    scriptTag.onload = onload;
  }

  document.body.appendChild(scriptTag);

  script.remove();

  return scriptTag;
};

const TildaLayout = (props: TTildaLayoutProps): React.ReactElement | null => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scripts = rootRef.current?.querySelectorAll('script');

    if (!scripts?.length) {
      return;
    }

    const inlineScripts: HTMLScriptElement[] = [];

    let notLoadedCount = 0;

    scripts.forEach((script: HTMLScriptElement) => {
      if (script.src) {
        const isWaitForLoadSrc = getIsWaitForLoadSrc(script.src, WAIT_FOR_LOAD);

        if (isWaitForLoadSrc) {
          notLoadedCount++;
        }

        insertScript(
          script,
          isWaitForLoadSrc ? (
            () => {
              notLoadedCount--;

              if (notLoadedCount === 0) {
                inlineScripts.forEach((inlineScript) => insertScript(inlineScript));
              }
            }
          ) : undefined
        );
      } else {
        inlineScripts.push(script);
      }
    });
  }, []);

  const {
    children,
    className,
    tildaProps,
  } = props;

  return (
    <div
      ref={rootRef}
      // className={classnames(styles.root, className, 't-records')}
      id="allrecords"
      {...tildaProps}
    >
      {children}
    </div>
  );
};

export {
  TildaLayout,
};
