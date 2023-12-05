import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../constants';

const { DARK, LIGHT } = THEMES;

const defaultTheme = LIGHT;

export const ThemeContext = React.createContext({
  theme: defaultTheme,
  toggleTheme: /* istanbul ignore next */ () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(defaultTheme);
  const toggleTheme = useCallback(() => {
    setTheme(theme === LIGHT ? DARK : LIGHT);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node
};

ThemeProvider.defaultProps = {
  children: null
};
