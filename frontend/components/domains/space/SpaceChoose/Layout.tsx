import { TSpace } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { EntityItem } from '@components/domains/shared/EntityItem';
import { SpaceCreateBtn } from '@components/domains/space/buttons/SpaceCreateBtn';
import { UserWelcome } from '@components/domains/user/UserWelcome';

import { Avatar } from '@components/uiKit/Avatar';
import { CircularProgress } from '@components/uiKit/CircularProgress';
import { Grid } from '@components/uiKit/Grid';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TPaperProps> & {
  spaces: TSpace[];
  isLeaving: boolean;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    spaces,
    isLeaving,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderContent = () => {
    if (!spaces.length) {
      return t('spacesList.emptyDescription');
    }

    return (
      <Grid
        gridTemplateColumns="1fr"
        gridGap={3}
      >
        {
          spaces.map((space) => (
            <EntityItem
              key={space._id.toString()}
              type="link"
              linkProps={{
                href: routing.getSpaceUrlTemplate(),
                as: routing.getSpaceUrl(space._id),
              }}
              startAdornment={(
                <Avatar
                  variant="rounded"
                  dimension="100"
                  svg={space.generatedAvatarSvg}
                />
              )}
              item={space.name}
            />
          ))
        }
      </Grid>
    );
  };

  if (isLeaving) {
    return (
      <CircularProgress />
    );
  }

  if (!spaces.length) {
    return (
      <UserWelcome />
    );
  }

  return (
    <Paper
      variant="card"
      maxWidth="460px"
      {...other}
    >
      <PaperHeader>
        {t('spacesList.title')}
      </PaperHeader>

      <PaperContent>
        {renderContent()}
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <SpaceCreateBtn>
            {t('spacesList.submitBtn')}
          </SpaceCreateBtn>
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
