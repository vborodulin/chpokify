import { TSpaceShortPreview, TTeamShortPreview } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TInviteToSpaceAcceptSuccessLayoutProps = {
  space: TSpaceShortPreview;
  team: TTeamShortPreview | null;
  errGlobalMsg: string;
  isLoading: boolean;
  onCancel: () => void;
  onAccept: () => void;
};

const Layout = (props: TInviteToSpaceAcceptSuccessLayoutProps): React.ReactElement | null => {
  const {
    space,
    team,
    errGlobalMsg,
    isLoading,
    onAccept,
    onCancel,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderTitle = () => {
    if (team) {
      return t('inviteToSpaceAcceptSuccess.titleWithTeam', {
        spaceName: space.name,
        teamName: team.name,
      });
    }

    return t('inviteToSpaceAcceptSuccess.title', {
      spaceName: space.name,
    });
  };

  return (
    <Modal
      variant="card"
      preventClose
    >
      <PaperHeader>
        {renderTitle()}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('inviteToSpaceAcceptSuccess.description')}
        </Text>

        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('inviteToSpaceAcceptSuccess.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={onAccept}
          >
            {t('inviteToSpaceAcceptSuccess.acceptBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
