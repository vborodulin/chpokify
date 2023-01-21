import { dateHelpers } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';

import { Text, TTextProps } from '@components/uiKit/Text';

import { useDidmount } from '@components/utils/hooks/useDidmount';
import { useInterval } from '@components/utils/hooks/useInterval';

const SECONDS_GEP_UPDATE = 3;

export type TTimerProps = Partial<TTextProps> & {
  timerId: TEntityID;
  isActive: boolean;
  pastSeconds: number;
};

const Timer = (props: TTimerProps): React.ReactElement | null => {
  const {
    timerId,
    isActive,
    pastSeconds,
    ...other
  } = props;

  const [seconds, setSeconds] = useState<number>(pastSeconds);

  const handleTicSeconds = () => {
    setSeconds((prevVal) => prevVal + 1);
  };

  useInterval(
    'interval',
    handleTicSeconds,
    isActive ? 1000 : null
  );

  useEffect(() => {
    if (pastSeconds > seconds + SECONDS_GEP_UPDATE) {
      setSeconds(pastSeconds);
    }
  }, [pastSeconds]);

  useDidmount(() => {
    setSeconds(pastSeconds);
  }, [timerId]);

  return (
    <Text
      fontSize={6}
      color="font.d_20"
      css={css`flex-shrink: 0; white-space: nowrap`}
      {...other}
    >
      {dateHelpers.formatSeconds(seconds)}
    </Text>
  );
};

export {
  Timer,
};
