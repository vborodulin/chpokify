import CustomError from '@pages/_error';
import React, { ErrorInfo } from 'react';

import { log } from '@lib/logger';

export type TErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactElement;
};

export type TErrorBoundaryState = {
  isFailed: boolean;
};

class ErrorBoundary extends React.Component<TErrorBoundaryProps, any> {
  public constructor(props: TErrorBoundaryProps) {
    super(props);

    this.state = {
      isFailed: false,
    };
  }

  public static getDerivedStateFromError(): TErrorBoundaryState {
    return {
      isFailed: true,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    log.error(error, errorInfo);
  }

  public render() {
    const {
      fallback = '',
      children,
    } = this.props;
    const { isFailed } = this.state;

    if (isFailed) {
      return fallback || <CustomError />;
    }

    return children;
  }
}

export {
  ErrorBoundary,
};
