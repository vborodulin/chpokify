import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import shortid from 'shortid';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconLink } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

import { copyToClipboard } from '@lib/copyToClipboard';

const HIDE_TIMEOUT = 500;

export type TCopyBtnProps = Partial<TButtonProps> & {
  getCopyText: () => Promise<string> | string;
  hideTimeout?: number
  handleCopyBefore?: () => boolean;
};

const CopyBtn = (props: TCopyBtnProps): React.ReactElement | null => {
  const {
    hideTimeout,
    getCopyText,
    handleCopyBefore,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const popperIdRef = useRef(`inviteToSpaceBtn-${shortid()}`);
  const timerIdRef = useRef<number>(0);

  const [targetElement, setTargetElement] = useState<any>(null);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const handleGetCopyText = async () => {
      const urlLink = await getCopyText();
      setUrl(urlLink);
    };

    handleGetCopyText();
  }, []);

  const handleClearTimer = () => {
    clearTimeout(timerIdRef.current);
  };

  const handleHideByTimeout = () => {
    timerIdRef.current = window.setTimeout(() => {
      dispatch(uiActions.popperHide(popperIdRef.current));
    }, hideTimeout || HIDE_TIMEOUT);
  };

  const handleCopy = async () => {
    if (handleCopyBefore && !handleCopyBefore()) {
      return;
    }

    handleClearTimer();
    await copyToClipboard(url);
    handleHideByTimeout();
  };

  return (
    <>
      <Button
        ref={setTargetElement}
        variant="primary-outline"
        StartIcon={IconLink}
        onClick={handleCopy}
        {...other}
      />
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        options={{
          ...popperTooltipOptions,
          placement: 'left',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {t('common.copiedTooltip')}
          </TooltipTitle>
        </Tooltip>
      </Popper>
    </>
  );
};

export {
  CopyBtn,
};
