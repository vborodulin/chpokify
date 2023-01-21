import { useDispatch } from 'react-redux';

import { TAppDispatch } from '@Redux/types';

const useAppDispatch = () => useDispatch<TAppDispatch>();

export {
  useAppDispatch,
};
