import base from 'paths.macro';
import React, { ChangeEvent, useState } from 'react';

import { Switcher } from '@components/uiKit/Switcher/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
  };

  return (
    <Switcher
      name="switcher"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export const Disabled = () => (
  <Switcher
    name="switcher"
    checked={false}
    disabled
    onChange={() => {}}
  />
);
