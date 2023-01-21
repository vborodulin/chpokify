import { TUserProtected } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Modal, TModalProps } from '@components/domains/shared/Modal';
import { Username } from '@components/domains/user/Username';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const ListItem = styled(Box)<TBoxProps>`
color: ${({ theme }) => theme.colors.font.normal};
list-style: disc;
`;

export type TLayoutProps = Partial<TModalProps> & {
  teamName: string;
  teamUsers: TUserProtected[];
  onCancel: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    teamName,
    teamUsers,
    onCancel,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderContent = () => {
    if (!teamUsers.length) {
      return (
        <Text
          fontSize={2}
        >
          {t('teamViewModal.noMembersDescription')}
        </Text>
      );
    }

    return (
      <>
        <Text
          fontSize={2}
          mb={3}
        >
          {t('teamViewModal.description')}
        </Text>

        <Box
          as="ul"
        >
          {
            teamUsers.map((user) => (
              <ListItem
                as="li"
                ml="1em"
              >
                <Flex
                  alignItems="baseline"
                >
                  <Username
                    isGuest={user.isGuest}
                    username={user.username}
                  />
                </Flex>
              </ListItem>
            ))
          }
        </Box>
      </>
    );
  };

  return (
    <Modal
      {...other}
    >
      <PaperHeader>
        {t('teamViewModal.title', {
          teamName,
        })}
      </PaperHeader>

      <PaperContent>
        {renderContent()}
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('teamViewModal.cancelBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
