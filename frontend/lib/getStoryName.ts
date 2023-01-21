import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';

const getStoryName = (base: string) => {
  const enhancedName = trimStart(base, '/components');
  return trimEnd(enhancedName, '/');
};

export {
  getStoryName,
};
