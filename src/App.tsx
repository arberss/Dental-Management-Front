import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { decodeToken } from './utils/decodeToken';
import RoutesComponent from './routes/Routes';
import AuthContext from './context/authContext';
import { ThemeProvider } from './styles/ThemeProvider';
import { ColorScheme, ColorSchemeProvider } from '@mantine/core';

function App() {
  const { isAuth, handleLogout } = useContext(AuthContext);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const decodedToken: { [key: string]: any } | null = decodeToken();

    if (!decodedToken) {
      handleLogout();
    }
  }, [isAuth]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <ThemeProvider colorScheme={colorScheme}>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </ThemeProvider>
    </ColorSchemeProvider>
  );
}

export default App;
