import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

const useCanMakeOnboarding = (): boolean => {
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  return canModerate;
};

export {
  useCanMakeOnboarding,
};
