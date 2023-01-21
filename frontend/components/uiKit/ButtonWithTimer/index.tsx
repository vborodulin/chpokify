import { timeHelpers } from '@chpokify/helpers';
import React, { useEffect, useState } from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';

import { useInterval } from '@components/utils/hooks/useInterval';

export type TButtonWithTimerProps = TButtonProps & {
  startId: string;
  seconds: number;
  renderTimerTitle: (timer: string) => string;
};

const ButtonWithTimer = (props: TButtonWithTimerProps): React.ReactElement | null => {
  const {
    startId,
    seconds,
    renderTimerTitle,
    children,
    disabled,
    ...other
  } = props;

  const [timerSec, setTimerSec] = useState<number>(0);

  useInterval(
    'interval',
    () => {
      setTimerSec((prevVal) => prevVal - 1);
    },
    timerSec ? 1000 : null
  );

  useEffect(() => {
    if (!startId) {
      return;
    }

    setTimerSec(seconds);
  }, [startId]);

  const renderTitle = () => {
    if (timerSec) {
      return renderTimerTitle(timeHelpers.fmtSecondsToMinutes(timerSec));
    }

    return children;
  };

  return (
    <Button
      {...other}
      disabled={!!timerSec || disabled}
    >
      {renderTitle()}
    </Button>
  );
};

export {
  ButtonWithTimer,
};
