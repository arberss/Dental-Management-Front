import React from 'react';
import { IconUsers, IconReportMedical, IconUser } from '@tabler/icons-react';

export interface LinkDataProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const linkData: LinkDataProps[] = [
  {
    icon: <IconUsers size={20} />,
    color: 'blue',
    label: 'Patients',
    to: '/patients',
  },
  {
    icon: <IconReportMedical size={20} />,
    color: 'blue',
    label: 'Treatments',
    to: '/treatments',
  },
  {
    icon: <IconUser size={20} />,
    color: 'blue',
    label: 'Doctors',
    to: '/doctors',
  },
];
