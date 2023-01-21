import React from 'react';

import { IndexSection } from '@components/domains/Index/IndexSection';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

const IndexPartnership = () => (
  <IndexSection>
    <Flex
      flexDirection="column"
      alignItems="center"
    >
      <Text
        fontSize={3}
        textAlign="center"
        opacity="0.6"
      >
        Have an idea or question?
      </Text>

      <Text
        fontSize={3}
        textAlign="center"
        opacity="0.6"
        mb={3}
      >
        Want to partnership or work with us?
      </Text>

      <a
        href="mailto:info@chpokify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>
          info@chpokify.com
        </Button>
      </a>
    </Flex>
  </IndexSection>
);

export {
  IndexPartnership,
};
