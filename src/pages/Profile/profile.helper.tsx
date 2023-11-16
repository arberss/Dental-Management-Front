import Badge from '@/components/Badge/Badge';
import { User } from '@/context/authContext';
import dayjs from 'dayjs';

export const cardsInfo = (data: User) => {
  let roles = '';

  data.roles?.map((role: string) => {
    roles = `${roles}${roles ? ', ' : ''} ${
      role.charAt(0).toUpperCase() + role.slice(1)
    }`;
    return role;
  });

  return [
    {
      title: 'Email',
      value: data.email,
    },
    {
      title: data.roles.length > 1 ? 'Roles' : 'Role',
      value: roles,
    },
    {
      title: 'Created At',
      value: dayjs(data?.createdAt).format('DD MMMM YYYY'),
    },
    {
      title: 'Status',
      value: <Badge status={data.status} />,
    },
  ];
};
