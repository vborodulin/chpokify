import base from 'paths.macro';
import React from 'react';

import { Text } from '@components/uiKit/Text/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <>
    <Text
      as="p"
      fontSize={[0]}
    >
      Text 11px
    </Text>
    <Text
      fontSize={[1]}
    >
      Text 12px
    </Text>
    <Text
      fontSize={[2]}
    >
      Text 14px
    </Text>
    <Text
      fontSize={[3]}
    >
      Text 16px
    </Text>
    <Text
      fontSize={[4]}
    >
      Text 18px
    </Text>
    <Text
      fontSize={[5]}
    >
      Text 20px
    </Text>
    <Text
      fontSize={[6]}
    >
      Text 24px
    </Text>
    <Text
      fontSize={[0]}
      fontWeight={[1]}
    >
      Text 11px bold
    </Text>
    <Text
      fontSize={[1]}
      fontWeight={[1]}
    >
      Text 12px bold
    </Text>
    <Text
      fontSize={[2]}
      fontWeight={[1]}
    >
      Text 14px bold
    </Text>
    <Text
      fontSize={[3]}
      fontWeight={[1]}
    >
      Text 16px bold
    </Text>
    <Text
      fontSize={[4]}
      fontWeight={[1]}
    >
      Text 18px bold
    </Text>
    <Text
      fontSize={[5]}
      fontWeight={[1]}
    >
      Text 20px bold
    </Text>
    <Text
      fontSize={[6]}
      fontWeight={[1]}
    >
      Text 24px bold
    </Text>
  </>
);
