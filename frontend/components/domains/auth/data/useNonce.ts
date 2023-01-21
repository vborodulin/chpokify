import { authApi } from 'api/auth';
import useSWR from 'swr';

export const getCurrUserKey = () => '/auth/nonce';

const fetcher = async () => authApi.getNonce();

const useNonce = () => {
  const { data, error, mutate } = useSWR(
    getCurrUserKey(),
    fetcher
  );

  const isLoading = !data && !error;

  return {
    nonce: data?.data.result.nonce,
    isLoading,
    error,
    mutate,
  };
};

export {
  useNonce,
};
