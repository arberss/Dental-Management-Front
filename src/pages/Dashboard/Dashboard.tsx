import AppShellLayout from '@/components/AppShell/AppShell';
import AuthContext from '@/context/authContext';
import { routes } from '@/routes/routes.helper';
import { useContext, useEffect } from 'react';
import {
  Outlet,
  useNavigate,
  matchRoutes,
  useLocation,
} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const matchRoutesResult = matchRoutes(routes, location);

  const { user, isAuth } = useContext(AuthContext);
  const linkDataObject = routes.find(
    (link) =>
      link.roles?.some((item) => user?.roles.includes(item)) &&
      !link.path.includes('/:')
  );

  const checkIfCanVisit = routes.find((link) => {
    const findRoute =
      matchRoutesResult && link.path === matchRoutesResult[0].route.path;

    if (findRoute) {
      return link.roles?.find((role) => {
        return user?.roles.includes(role);
      });
    }

    return null;
  });

  useEffect(() => {
    if (isAuth && linkDataObject && !checkIfCanVisit) {
      navigate(linkDataObject?.path);
    }
  }, [isAuth, checkIfCanVisit, linkDataObject]);

  return (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  );
};

export default Dashboard;
