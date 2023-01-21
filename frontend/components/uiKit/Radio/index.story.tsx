import base from 'paths.macro';
import React, { ChangeEvent, useState } from 'react';

import { Grid } from '@components/uiKit/Grid';
import { Radio } from '@components/uiKit/Radio';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <Grid>
      <Radio
        name="option1"
        value="1"
        checked={value === '1'}
        onChange={handleChange}
      />
      <Radio
        name="option2"
        value="2"
        checked={value === '2'}
        onChange={handleChange}
      />
      <Radio
        name="option3"
        value="3"
        checked={value === '3'}
        onChange={handleChange}
        disabled
      />
    </Grid>
  );
};
