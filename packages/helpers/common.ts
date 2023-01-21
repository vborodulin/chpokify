export const isServer = () => typeof window === 'undefined';

export const isEqualsId = (a: any, b: any) => {
  if (!a || !b) {
    return false;
  }

  try {
    return a.toString() === b.toString();
  } catch {
    return false;
  }
};
