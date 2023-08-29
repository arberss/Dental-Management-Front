import Login from '@/pages/Auth/Login/Login';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Patients from '@/pages/Patients';
import { decodeToken } from '@/utils/decodeToken';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

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
        <Route path='patients' element={<Patients />} />
      </Route>

      {!decodedToken && (
        <>
          <Route path='/auth/login' element={<Login />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;
