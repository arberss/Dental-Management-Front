import { IconCash } from '@tabler/icons-react';
import * as dayjs from 'dayjs';

export const cardData = [
  {
    title: 'Total',
    data: [
      {
        key: 'totalPatients',
        title: 'Patients',
      },
      {
        key: 'totalTreatments',
        title: 'Treatments',
      },
      {
        key: 'earnings',
        title: 'Earnings',
        icon: <IconCash size='35px' color='green' />,
        money: true,
      },
    ],
  },
  {
    title: `Current Month (${dayjs().format('MMMM')})`,
    data: [
      {
        key: 'currentMonthTreatments',
        title: 'Treatments',
      },
      {
        key: 'currentMonthEarnings',
        title: 'Earnings',
        icon: <IconCash size='35px' color='green' />,
        money: true,
      },
    ],
  },
  {
    title: `Today (${dayjs().format('DD/MM/YYYY')})`,
    data: [
      {
        key: 'totalTodayTreatments',
        title: 'Treatments',
      },
      {
        key: 'todayTreatmentsEarnings',
        title: 'Earnings',
        icon: <IconCash size='35px' color='green' />,
        money: true,
      },
    ],
  },
];
