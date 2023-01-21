import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const Root = styled(Paper)<TPaperProps>`
  border: 2px solid ${({ theme }) => theme.colors.negative.normal};
`;

export type TSettingsDangerZoneProps = Partial<TPaperProps>;

const SettingsDangerZone = (props: TSettingsDangerZoneProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const countParticipants = useSelector(spacesSelectors.getCurrSpaceParticipantsCount);
  const countAdminsParticipants = useSelector(spacesSelectors.getCountAdminsParticipantsFromCurrSpace);

  const handleLeave = () => {
    dispatch(uiActions.modalOpen(
      uiTypes.MODAL_TYPES.SPACE_CONFIRM_LEAVE
    ));
  };

  if (countParticipants <= 1 || countAdminsParticipants <= 1) {
    return null;
  }

  return (
    <Root
      variant="card"
      {...other}
    >
      <PaperContent>
        <Grid
          alignItems="center"
          gridTemplateColumns={[
            '1fr',
            '1fr auto',
          ]}
          gridGap={4}
        >
          <Box
            mr={4}
          >
            <Text
              fontSize={4}
              fontWeight={1}
              mb={1}
            >
              {t('spaceSettingsDangerZone.title')}
            </Text>

            <Text
              fontSize={2}
            >
              {t('spaceSettingsDangerZone.description')}
            </Text>
          </Box>

          <Button
            variant="negative"
            onClick={handleLeave}
          >
            {t('spaceSettingsDangerZone.leaveBtn')}
          </Button>
        </Grid>
      </PaperContent>
    </Root>
  );
};

export {
  SettingsDangerZone,
};
