import React from 'react';

export type TTabPanelProps = {
  value: number;
  index: number;
  children: React.ReactElement | null;
};

const TabPanel = (props: TTabPanelProps): React.ReactElement | null => {
  const {
    value,
    index,
    children,
  } = props;

  if (value !== index) {
    return null;
  }

  return children;
};

export {
  TabPanel,
};
