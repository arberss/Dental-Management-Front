import AppShellLayout from '@/components/AppShell/AppShell';
import { linkData } from '@/components/Navbar/links/helper';
import AuthContext from '@/context/authContext';
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, isAuth } = useContext(AuthContext);
  const linkDataObject = linkData.find((link) =>
    link.roles?.some((item) => user?.roles.includes(item))
  );

  useEffect(() => {
    if (isAuth && linkDataObject) {
      navigate(linkDataObject?.to);
    }
  }, [isAuth]);

  return (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  );
};

export default Dashboard;
