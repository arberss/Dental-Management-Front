import { BrowserRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { decodeToken } from './utils/decodeToken';
import RoutesComponent from './routes/Routes';
import AuthContext from './context/authContext';
import { ThemeProvider } from './styles/ThemeProvider';
import { ColorScheme, ColorSchemeProvider } from '@mantine/core';

const localColorScheme = localStorage.getItem(
  'dental-color-mode'
) as ColorScheme;

function App() {
  const { isAuth, handleLogout } = useContext(AuthContext);
  
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    localColorScheme ?? 'light'
  );
  const toggleColorScheme = (value: ColorScheme) => {
    const val = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(val);
    localStorage.setItem('dental-color-mode', val);
  };

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
