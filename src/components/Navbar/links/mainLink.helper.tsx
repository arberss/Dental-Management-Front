import React from 'react';
import {
  IconUsers,
  IconReportMedical,
  IconUser,
  IconCalendar,
  IconFileAnalytics,
} from '@tabler/icons-react';

export interface LinkDataProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  roles?: string[];
}

export const linkData: LinkDataProps[] = [
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'Patients',
    to: '/patients',
    roles: ['admin', 'doctor'],
  },
  {
    icon: <IconReportMedical size={20} color='orange' />,
    color: 'blue',
    label: 'Treatments',
    to: '/treatments',
    roles: ['admin', 'doctor'],
  },
  {
    icon: <IconUser size={20} color='green' />,
    color: 'blue',
    label: 'Doctors',
    to: '/doctors',
    roles: ['admin'],
  },
  {
    icon: <IconCalendar size={20} color='#979e49' />,
    color: 'blue',
    label: 'Schedules',
    to: '/schedules',
    roles: ['admin', 'doctor'],
  },
  {
    icon: <IconFileAnalytics size={20} color='#f57242' />,
    color: 'blue',
    label: 'Statistics',
    to: '/statistics',
    roles: ['admin', 'doctor'],
  },
];
