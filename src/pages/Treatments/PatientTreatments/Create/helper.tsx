import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Treatment Name is required'),
  description: Yup.string().required('Treatment Description is required'),
  price: Yup.string().required('Treatment Price is required'),
  doctor: Yup.string().required('Doctor is required'),
});
