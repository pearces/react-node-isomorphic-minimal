import React from 'react';
import { useRoutes, type RouteObject } from 'react-router';
import App from 'components/App';
import Count from 'components/Count';
import NoMatch from 'components/NoMatch';
import { ThemeProvider } from './context/ThemeContext';

export const routes: RouteObject[] = [
  {
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
    children: [
      {
        path: '/',
        element: <Count />
      },
      {
        path: '/count',
        element: <Count />
      },
      {
        path: '*',
        element: <NoMatch routes={[{ path: '/' }, { path: '/count' }]} />
      }
    ]
  }
];

export default function Routes() {
  return useRoutes(routes);
}
