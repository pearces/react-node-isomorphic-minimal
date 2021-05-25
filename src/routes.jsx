import React from 'react';
import Count from 'components/Count';
import NoMatch from 'components/NoMatch';
import { Switch, Route } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    component: Count,
    exact: true
  },
  {
    path: '/count',
    component: Count
  }
];

const RouteConfig = (props) => (
  <Switch>
    {routes.map(({ path, component: Component, ...rest }) => (
      <Route
        key={path}
        path={path}
        {...rest}
        render={(routeProps) => <Component {...routeProps} {...props} />}
      />
    ))}
    <Route path="*">
      <NoMatch routes={routes} />
    </Route>
  </Switch>
);

export default RouteConfig;
