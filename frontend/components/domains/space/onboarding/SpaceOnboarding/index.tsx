import { isServer } from '@chpokify/helpers';
import dynamic from 'next/dynamic';
import React from 'react';

const OnboardingContent = dynamic(
  () => import('./SpaceOnboardingContent'),
  { ssr: false }
);

const SpaceOnboarding = () => {
  if (isServer()) {
    return null;
  }

  return (
    <OnboardingContent />
  );
};

export {
  SpaceOnboarding,
};
