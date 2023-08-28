import {
  ColorScheme,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';

interface ThemeProviderProps {
  children: React.ReactNode;
  colorScheme: ColorScheme;
}

export function ThemeProvider({ children, colorScheme }: ThemeProviderProps) {
  const theme: MantineThemeOverride = {
    fontFamily: 'Cabin, sans-serif',
    colorScheme,
    components: {
      Button: {
        styles: (theme) => ({
          root: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors?.blue[9]
                : theme.colors?.blue[5],
          },
        }),
      },
    },
  };

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
}
