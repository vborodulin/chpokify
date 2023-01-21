import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Button, TButtonProps } from '@components/uiKit/Button';

import { TRANS } from '@components/utils/types';

export type TSpaceCreateBtnProps = Partial<TButtonProps>;

const SpaceCreateBtn = (props: TSpaceCreateBtnProps): React.ReactElement | null => {
  const {
    className,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.SPACE_CREATE));
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      className={classnames(className, CLASS_TEST.SPACE_CREATE_BTN)}
      {...other}
    >
      {t('spaceCreateBtn.title')}
    </Button>
  );
};

export {
  SpaceCreateBtn,
};
