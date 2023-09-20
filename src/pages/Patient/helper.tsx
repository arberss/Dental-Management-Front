import dayjs from 'dayjs';
import { IPatient } from './patient.interface';


export const cardsInfo = (data?: IPatient) => [
    {
      title: 'Birthday',
      value: dayjs(data?.dateOfBirth).format('DD MMMM YYYY'),
    },
    {
      title: 'Treatments',
      value: data?.treatments?.length,
    },
    {
      title: 'Registered Date',
      value: dayjs(data?.createdAt).format('DD MMMM YYYY'),
    },
    {
      title: 'City',
      value: `${data?.address?.street}, ${data?.address.city}`,
    },
    {
      title: 'State',
      value: data?.address?.state,
    },
    {
      title: 'Zip Code',
      value: data?.address?.postalCode,
    },
  ];