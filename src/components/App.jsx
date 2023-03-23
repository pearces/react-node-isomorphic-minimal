import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';

const App = () => (
  <main>
    <Outlet />
  </main>
);

export default App;
