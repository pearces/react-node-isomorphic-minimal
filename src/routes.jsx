import React from 'react';
import { useRoutes } from 'react-router-dom';
import App from 'components/App';
import Count from 'components/Count';
import NoMatch from 'components/NoMatch';

export const routes = [
  {
    element: <App />,
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
