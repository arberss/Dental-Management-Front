import { endpoints } from '@/config/endpoints';
import { IPatient } from '@/pages/Patient/patient.interface';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

interface IAuthContext {
  isAuth: boolean;
  token: string | null;
  handleLogin: (_value: string) => void;
  setIsAuth: (_value: boolean) => void;
  handleLogout: () => void;
  user: User | null;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  patients: IPatient[];
  createdAt: Date;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  token: '',
  handleLogin: (_value: string) => {},
  setIsAuth: (_value: boolean) => {},
  handleLogout: () => {},
  user: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const queryClient = useQueryClient();

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (token: string) => {
    localStorage.setItem('dental-token', token);
    setToken(token);
    setIsAuth(true);
  };

  const getUserData = async () => {
    const response = await axios.get(endpoints.me);

    if (response?.data) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getUserData();
    }
  }, [isAuth]);

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
        setIsAuth,
        token,
        handleLogin,
        handleLogout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
