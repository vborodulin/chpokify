import React from 'react';

import { HowItem } from '../HowItem';

const SlackBlock = () => (
  <HowItem
    title="3. Slack up notifications and reminders"
    description="Set up notifications and reminders for yourself and for teammates right
        into Slack (planned)! Chpokify will kindly notify about upcoming session or unfinished stories."
    actionTitle="Try slack integration"
    img={{
      src: '/images/chpokify-integration.png',
      alt: 'slack-integration',
      width: '440px',
      height: '300px',
      layout: 'intrinsic',
    }}
    order="asc"
  />
);

export {
  SlackBlock,
};
