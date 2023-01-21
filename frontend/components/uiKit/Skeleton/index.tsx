import SkeletonComponent, { SkeletonProps } from '@material-ui/lab/Skeleton';
import React from 'react';
import styled from 'styled-components';

export type TSkeletonProps = SkeletonProps;

const StyledSkeleton = styled(SkeletonComponent)<TSkeletonProps>`
  border-radius: ${({ theme }) => theme.radii[3]};
`;

const Skeleton = (props: TSkeletonProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <StyledSkeleton
      animation="wave"
      {...other}
    />
  );
};

export {
  Skeleton,
};
