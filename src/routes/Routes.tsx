import Login from '@/pages/Auth/Login/Login';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Doctors from '@/pages/Doctors/Doctors';
import Patient from '@/pages/Patient/Patient';
import Patients from '@/pages/Patients/Patients';
import Treatments from '@/pages/Treatments/Treatments';
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
        <Route path='patient/:patientId' element={<Patient />} />
        <Route path='treatments' element={<Treatments />} />
        <Route path='doctors' element={<Doctors />} />
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
