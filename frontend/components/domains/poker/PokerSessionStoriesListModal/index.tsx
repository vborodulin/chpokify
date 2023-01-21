import React from 'react';

import { Layout } from './Layout';

export type TPokerStoriesLisModalProps = {
  onClose: () => void;
}

const PokerStoriesLisModal = (props: TPokerStoriesLisModalProps): React.ReactElement | null => {
  const {
    onClose,
  } = props;

  return (
    <Layout
      onClose={onClose}
    />
  );
};

export {
  PokerStoriesLisModal,
};
