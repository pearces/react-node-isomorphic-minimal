import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { ThemeContext } from '../context/ThemeContext';
import './App.scss';

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <main className={theme}>
      <Outlet />
    </main>
  );
};

export default App;
