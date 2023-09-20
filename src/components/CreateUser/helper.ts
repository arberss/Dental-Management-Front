import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  roles: Yup.array().required('Role is required'),
});
