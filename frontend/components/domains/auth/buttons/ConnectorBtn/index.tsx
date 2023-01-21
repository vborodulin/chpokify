import React, { useCallback, useMemo } from 'react';
import { Connector } from 'wagmi';

import { useLoginWithConnector } from '@components/domains/auth/mutation/useLoginWithConnector';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';

export type TConnectorBtnProps = Partial<TButtonProps> & {
  connector: Connector
};

const ConnectorBtn = (props: TConnectorBtnProps): React.ReactElement | null => {
  const {
    connector,
    ...other
  } = props;

  const { loginConnector, isLoading } = useLoginWithConnector();

  const handleClick = useCallback(async () => {
    await loginConnector(connector);
  }, [
    loginConnector,
    connector,
  ]);

  const startIcon = useMemo(() => (
    <Box
      as="img"
      alt={connector.name}
      height="24px"
      src={`/images/connect/${connector.name}.svg`}
      width="24px"
      mr={2}
    />
  ), [
    connector.name,
  ]);

  return (
    <Button
      disabled={!connector.ready}
      isLoading={isLoading}
      startIcon={startIcon}
      onClick={handleClick}
      {...other}
    >
      {connector.name}
    </Button>
  );
};

export {
  ConnectorBtn,
};
