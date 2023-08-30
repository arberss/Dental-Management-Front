import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required(''),
  parentName: Yup.string().required(''),
  lastName: Yup.string().required(''),
  dateOfBirth: Yup.string().required(''),
  contactNumber: Yup.string().required(''),
  address: Yup.object({
    street: Yup.string().required(''),
    city: Yup.string().required(''),
    state: Yup.string().required(''),
    postalCode: Yup.string().required(''),
  }),
  treatment: Yup.object({
    name: Yup.string().required(''),
    description: Yup.string().required(''),
    price: Yup.string().required(''),
    doctor: Yup.string().required(''),
  }),
});
