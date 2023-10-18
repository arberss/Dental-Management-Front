import React, { useContext } from 'react';
import NavLink from '@/shared-components/NavLink/NavLink';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import AuthContext from '@/context/authContext';
import useCheckRole from '@/hooks/custom/useCheckRole';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
  roles?: string[];
  onClick?: (e: React.MouseEvent) => void;
}

function MainLink({ icon, color, label, to, onClick, roles }: MainLinkProps) {
  const { user } = useContext(AuthContext);

  const checkRole = useCheckRole({ roles, userRoles: user?.roles });
  if (!checkRole || !user) return null;

  return (
    <NavLink to={to}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          backgroundColor: 'transparent',
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? 'rgba(165, 216, 255, 0.05)'
                : 'rgba(165, 216, 255, 0.5)',
          },
        })}
        onClick={onClick}
      >
        <Group>
          <ThemeIcon
            color={color}
            variant='light'
            sx={(theme) => ({ border: `1px solid ${theme.colors.cyan[1]}` })}
          >
            {icon}
          </ThemeIcon>

          <Text sx={{ fontSize: 15, letterSpacing: 0.2 }}>{label}</Text>
        </Group>
      </UnstyledButton>
    </NavLink>
  );
}

export default MainLink;
