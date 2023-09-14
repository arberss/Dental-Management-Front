import { createContext, useState } from 'react';
import { useQueryClient } from 'react-query';

interface IAuthContext {
  isAuth: boolean;
  token: string | null;
  handleLogin: (_value: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  token: '',
  handleLogin: (_value: string) => {},
  handleLogout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const queryClient = useQueryClient();

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    localStorage.setItem('dental-token', token);
    setToken(token);
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('dental-token');
    setToken(null);
    setIsAuth(false);
    queryClient.removeQueries();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
