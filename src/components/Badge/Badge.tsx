import { Badge as MantineBadge } from '@mantine/core';

interface BadgeProps {
  status: 'verified' | 'pending';
}

const Badge = ({ status }: BadgeProps) => {
  const color = status === 'pending' ? 'orange' : 'green';
  return (
    <MantineBadge variant='filled' color={color} sx={{ fontSize: '12px' }}>
      {status}
    </MantineBadge>
  );
};

export default Badge;
