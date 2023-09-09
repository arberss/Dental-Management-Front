export const endpoints = {
  login: '/auth/signin',
  register: '/auth/signup',
  patients: '/patient/patients',
  patientsStats: '/patient/stats',
  doctors: '/user/doctors',
  addPatientTreatment: '/patient/addPatientTreatment',
  patient: '/patient/::patientId',
  updatePatient: '/patient/updatePatient',
  patientTreatments: '/treatments/patientTreatments/::patientId',
  treatments: '/treatments',
};
