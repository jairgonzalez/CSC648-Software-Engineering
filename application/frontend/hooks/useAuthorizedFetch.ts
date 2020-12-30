import { useRouter } from 'next/router';
import { useAuth } from '@contexts/AuthContext';

const useAuthorizedFetch = () => {
  const { accessToken } = useAuth();
  const router = useRouter();
  const authFetch = async (
    url: string,
    options?: RequestInit
  ): Promise<Response> => {
    if (accessToken === undefined) {
      // there is no auth - we probably want to redirect to login
      router.push('/login');
    }

    const fetchOptions: RequestInit = {
      ...options,
    };
    fetchOptions.headers = {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    // In future, we may catch error on invalid auth and redirect to login
    return fetch(url, fetchOptions);
  };
  return authFetch;
};

export default useAuthorizedFetch;
