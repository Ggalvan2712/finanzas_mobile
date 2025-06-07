import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useColorScheme as useSystemColorScheme } from 'react-native';

export type ThemeName = 'light' | 'dark';

export interface Colors {
  bg: string;
  text: string;
  surface: string;
  primary: string;
  accent: string;
}

const softColors: Colors = {
  bg: '#f4f4f4',
  text: '#222',
  surface: '#ffffff',
  primary: '#004388',
  accent: '#00acac',
};

const darkColors: Colors = {
  bg: '#1e1e1e',
  text: '#f4f4f4',
  surface: '#2c2c2c',
  primary: '#00acac',
  accent: '#8ec89a',
};

interface ThemeContextValue {
  theme: ThemeName;
  colors: Colors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  colors: softColors,
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const system = useSystemColorScheme();
  const [theme, setTheme] = useState<ThemeName>(system === 'dark' ? 'dark' : 'light');
  const colors = theme === 'dark' ? darkColors : softColors;

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
