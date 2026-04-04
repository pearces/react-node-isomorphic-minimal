import React, { useMemo, useCallback, type ReactNode, createContext, useState } from 'react';
import { THEMES } from '../constants';

const { DARK, LIGHT } = THEMES;
type Theme = (typeof THEMES)[keyof typeof THEMES];

const defaultTheme: Theme = LIGHT;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children = null }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const toggleTheme = useCallback(() => {
    setTheme(theme === LIGHT ? DARK : LIGHT);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
