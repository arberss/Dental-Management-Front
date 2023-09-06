import * as Yup from 'yup';
import * as dayjs from 'dayjs';
import { IAddPationFields } from './index.interface';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  parentName: Yup.string().required('Parent Name is required'),
  lastName: Yup.string().required('Last Name'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  }),
  treatment: Yup.object({
    name: Yup.string().required('Treatment Name is required'),
    description: Yup.string().required('Treatment Description is required'),
    price: Yup.string().required('Treatment Price is required'),
    doctor: Yup.string().required('Doctor is required'),
  }),
});

export const validationEditSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  parentName: Yup.string().required('Parent Name is required'),
  lastName: Yup.string().required('Last Name'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  }),
});

export const addPatientInitialValues: IAddPationFields = {
  firstName: '',
  parentName: '',
  lastName: '',
  dateOfBirth: dayjs().toDate(),
  contactNumber: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
  },
  treatment: {
    name: '',
    description: '',
    price: undefined,
    doctor: '',
  },
};
