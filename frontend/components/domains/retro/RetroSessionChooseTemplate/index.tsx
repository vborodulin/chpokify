import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

import { TRetroSessionEditFormProps } from '@components/domains/retro/RetroSessionEditForm';
import { RetroSessionTemplate } from '@components/domains/retro/RetroSessionTemplate';

import { Grid } from '@components/uiKit/Grid';

type TRetroSessionChooseTemplate =Pick<TRetroSessionEditFormProps, 'onChooseTemplate' | 'templateType' | 'hasEdit'>;

const RetroSessionChooseTemplate = (props: TRetroSessionChooseTemplate): React.ReactElement | null => {
  const {
    templateType,
    onChooseTemplate,
    hasEdit,
    ...other
  } = props;

  const retroTemplates = useSelector(configSelectors.getRetroTemplates);

  if (!retroTemplates) {
    return null;
  }

  return (
    <Grid
      gridGap={3}
      gridTemplateColumns={['1fr', '1fr 1fr']}
      {...other}
    >
      {Object.values(retroTemplates)
        .map((template) => (
          <RetroSessionTemplate
            key={template.type}
            type={template.type}
            isActive={template.type === templateType}
            onChooseTemplate={onChooseTemplate}
            hasEdit={hasEdit}
          />
        ))}
    </Grid>
  );
};

export {
  RetroSessionChooseTemplate,
};
