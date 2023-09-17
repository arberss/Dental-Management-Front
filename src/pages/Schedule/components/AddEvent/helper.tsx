import * as Yup from 'yup';
import dayjs from 'dayjs';

export enum ScheduleStatusEnum {
  active = 'active',
  cancelled = 'cancelled',
  completed = 'completed',
}

export interface ISchedule {
  title: string;
  startDate: Date;
  endDate: Date;
  status: ScheduleStatusEnum;
  doctor: string;
}

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date is required'),
  status: Yup.string().required('Status is required'),
  doctor: Yup.string().required('Doctor is required'),
});

export const initialValues = {
  title: '',
  startDate: dayjs().toDate(),
  endDate: dayjs().add(1, 'hour').toDate(),
  status: ScheduleStatusEnum.active,
  doctor: '',
};

export const statusList = Object.keys(ScheduleStatusEnum).map((item) => {
  return {
    label: item.charAt(0).toUpperCase() + item.slice(1),
    value: ScheduleStatusEnum[item as keyof typeof ScheduleStatusEnum],
  };
});

export const eventColor = (status: ScheduleStatusEnum) => {
  const colors = {
    [ScheduleStatusEnum.active]: 'blue',
    [ScheduleStatusEnum.completed]: 'green',
    [ScheduleStatusEnum.cancelled]: 'gray',
  };

  return colors[status];
};
