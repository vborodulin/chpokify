import { urlHelpers } from '@chpokify/helpers/url';
import { TStory } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';
import shortId from 'shortid';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Grid } from '@components/uiKit/Grid';
import { LinkComponent } from '@components/uiKit/Link';
import { Text, TTextProps } from '@components/uiKit/Text';

const getTitleLinks = (title: string) => title.match(new RegExp(urlHelpers.urlPattern, 'g'));
const getTitleWithoutLinks = (title: string) =>
  title.replace(new RegExp(urlHelpers.urlPattern, 'g'), '');

export type TStoryName = Partial<TTextProps> & {
  story: TStory;
};

const StoryName = (props: TStoryName): React.ReactElement | null => {
  const {
    story,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleClick = () => {
    if (!canModerate) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORY_EDIT, {
      story,
    }));
  };

  const links = getTitleLinks(story.title);

  return (
    <Box>
      <Text
        as="span"
        canHover={canModerate}
        fontSize={6}
        fontWeight={1}
        role={canModerate ? 'button' : ''}
        onClick={handleClick}
        {...other}
      >
        {getTitleWithoutLinks(story.title)}
      </Text>

      {
        links && links.length && (
          <Grid
            mt={2}
            gridGap={1}
          >
            {
              links.map((link) => (
                <LinkComponent
                  key={shortId()}
                  href={link}
                  target="_blank"
                >
                  {link}
                </LinkComponent>
              ))
            }
          </Grid>
        )
      }
    </Box>
  );
};

export {
  StoryName,
};
