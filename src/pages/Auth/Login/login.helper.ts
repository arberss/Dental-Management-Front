import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().required(''),
  password: Yup.string().required(''),
});
