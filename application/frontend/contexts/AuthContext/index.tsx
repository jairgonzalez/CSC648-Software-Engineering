import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { useLocalStorage } from '@hooks';
import { api } from '@services';

interface IAuthContext {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  role: string;
  login: (
    email: string,
    password: string,
    onLogin: (isAdmin: boolean) => void,
    onError: () => void
  ) => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AuthContext: React.Context<IAuthContext> = createContext();

const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [role, setRole] = useState('admin');
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    'accessToken',
    null
  );
  const router = useRouter();

  useEffect(() => {
    api.initAxios(accessToken);
  }, [accessToken]);

  const login = (
    email: string,
    password: string,
    onLogin: (isAdmin: boolean) => void,
    onError: () => void
  ): void => {
    api
      .login(email, password)
      .then((res) => {
        if (res?.access_token) {
          setAccessToken(res.access_token);
          setRole(res.role);
          onLogin(res.role === 'admin');
        } else {
          onError();
        }
      })
      .catch(() => onError());
  };

  const logout = (): void => {
    setAccessToken(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, login, logout, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext =>
  useContext<IAuthContext>(AuthContext);

export default AuthContextProvider;
