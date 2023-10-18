import VerifyUser from '@/components/CreateUser/VerifyUser/VerifyUser';
import Login from '@/pages/Auth/Login/Login';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { decodeToken } from '@/utils/decodeToken';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { routes } from './routes.helper';

const RoutesComponent = () => {
  const decodedToken: { [key: string]: any } | null = decodeToken();

  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute redirectPath='/auth/login'>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Route>

      {!decodedToken && (
        <>
          <Route path='/auth/login' element={<Login />} />
          <Route
            path='/auth/verify-registered-user/token'
            element={<VerifyUser />}
          />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;
