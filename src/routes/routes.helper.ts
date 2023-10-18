import Doctors from '@/pages/Doctors/Doctors';
import Patient from '@/pages/Patient/Patient';
import Patients from '@/pages/Patients/Patients';
import Profile from '@/pages/Profile/Profile';
import Schedule from '@/pages/Schedule/Schedule';
import Treatments from '@/pages/Treatments/Treatments';

export const routes = [
  { path: '/patients', component: Patients, roles: ['admin', 'doctor'] },
  {
    path: '/patients/patient/:patientId',
    component: Patient,
    roles: ['admin', 'doctor'],
  },
  { path: '/treatments', component: Treatments, roles: ['admin', 'doctor'] },
  { path: '/doctors', component: Doctors, roles: ['admin'] },
  { path: '/schedules', component: Schedule, roles: ['admin', 'doctor'] },
  { path: '/profile', component: Profile, roles: ['admin', 'doctor'] },
];
