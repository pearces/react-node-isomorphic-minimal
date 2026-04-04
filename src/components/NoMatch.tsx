import React from 'react';
import { Link } from 'react-router';
import './NoMatch.scss';

type NoMatchRoute = {
  path: string;
};

type NoMatchProps = {
  routes?: NoMatchRoute[];
};

const NoMatch = ({ routes = [] }: NoMatchProps) => (
  <>
    <h1>404 - Not Found</h1>
    <h3>Try one of these instead:</h3>
    <ul className="no-list-style">
      {routes.map(({ path }) => (
        <li key={path}>
          <Link to={path}>{path}</Link>
        </li>
      ))}
    </ul>
  </>
);

export default NoMatch;
