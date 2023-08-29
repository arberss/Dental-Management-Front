import { Navbar as MantineNavbar } from '@mantine/core';
import { linkData, LinkDataProps } from './links/helper';
import MainLinks from './links/MainLinks';
import NavbarHeader from './NavbarHeader';
import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/context/authContext';
import { useContext } from 'react';

interface NavbarProps {
  isOpen: boolean;
}

const Navbar = ({ isOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const linkDataFooter: LinkDataProps[] = [
    {
      icon: <IconLogout size={20} />,
      color: 'orange',
      label: 'Logout',
      to: '/auth/login',
      onClick: () => {
        handleLogout();
        navigate('/auth/login');
      },
    },
  ];

  return (
    <MantineNavbar
      // p='md'
      hiddenBreakpoint='md'
      hidden={!isOpen}
      width={{ md: 250 }}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[1],
        borderTopRightRadius: theme.radius.lg,
        borderBottomRightRadius: theme.radius.lg,
        padding: 0,

        [theme.fn.smallerThan('md')]: {
          width: 300,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      })}
    >
      <MantineNavbar.Section>
        <NavbarHeader title='Dental Management' />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt='xl' p="sm">
        <MainLinks linkData={linkData} />
      </MantineNavbar.Section>
      <MantineNavbar.Section mt='xl' p="sm">
        <MainLinks linkData={linkDataFooter} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
