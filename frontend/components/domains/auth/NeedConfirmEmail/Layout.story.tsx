import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    resendTimerSec={0}
    errGlobalMsg=""
    isLoading={false}
    onSignOut={() => {}}
    onResend={() => {}}
  />
);

export const Loading = () => (
  <Layout
    resendTimerSec={0}
    errGlobalMsg=""
    isLoading
    onSignOut={() => {}}
    onResend={() => {}}
  />
);

export const ResendSuccess = () => (
  <Layout
    resendTimerSec={200}
    errGlobalMsg=""
    isLoading={false}
    onSignOut={() => {}}
    onResend={() => {}}
  />
);

export const ResendError = () => (
  <Layout
    resendTimerSec={0}
    errGlobalMsg="Internal server error"
    isLoading={false}
    onSignOut={() => {}}
    onResend={() => {}}
  />
);
