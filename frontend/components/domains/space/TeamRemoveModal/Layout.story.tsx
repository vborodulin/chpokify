import base from 'paths.macro';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Modal>
    <Layout
      errGlobalMsg=""
      isLoading={false}
      onCancel={() => {}}
      onRemove={() => {}}
    />
  </Modal>
);

export const Loading = () => (
  <Modal>
    <Layout
      errGlobalMsg=""
      isLoading
      onCancel={() => {}}
      onRemove={() => {}}
    />
  </Modal>
);

export const ErrorGlobal = () => (
  <Modal>
    <Layout
      errGlobalMsg="Interval server error"
      isLoading
      onCancel={() => {}}
      onRemove={() => {}}
    />
  </Modal>
);
