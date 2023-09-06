import React from 'react';
import { IconUsers } from '@tabler/icons-react';

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
];
