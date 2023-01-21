const getComponentDisplayName = (Component: any) => Component.displayName || Component.name || 'Component';

const getElementClassnameProp = (el: any) => (el && el.props && el.props.className) || '';

const mergeRefs = <T>(refs: (React.Ref<T> | React.RefCallback<T>)[]): React.RefCallback<T> => (value) => {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(value);
    } else if (ref !== null) {
      (ref as React.MutableRefObject<T | null>).current = value;
    }
  });
};

export const reactHelpers = {
  getComponentDisplayName,
  getElementClassnameProp,
  mergeRefs,
};
