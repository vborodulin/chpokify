import NextImage, { ImageProps } from 'next/image';
import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TImageProps = TBoxProps & Omit<ImageProps, 'unsized'>;

const Image = (props: TImageProps): React.ReactElement => {
  const {
    src,
    alt,
    ...other
  } = props;

  return (
    <Box
      as={NextImage}
      src={src}
      alt={alt}
      layout="fill"
      objectFit="contain"
      {...other}
    />
  );
};

export {
  Image,
};
