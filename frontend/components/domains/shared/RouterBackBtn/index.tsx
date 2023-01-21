import { useRouter } from 'next/router';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconArrowLeft } from '@components/uiKit/Icons';

type TRouterBackBtnProps = TButtonProps;

const RouterBackBtn = (props: TRouterBackBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const router = useRouter();

  const handleClickGoBack = () => {
    router.back();
  };

  return (
    <Button
      StartIcon={IconArrowLeft}
      onClick={handleClickGoBack}
      {...other}
    />
  );
};

export {
  RouterBackBtn,
};
