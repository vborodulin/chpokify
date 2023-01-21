import base from 'paths.macro';
import React, { ChangeEvent, useState } from 'react';

import { Checkbox } from '@components/uiKit/CheckBox/index';

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
    <Checkbox
      name="checkBox"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export const Disabled = () => (
  <Checkbox
    name="checkBox"
    checked
    disabled
    onChange={() => {}}
  />
);
