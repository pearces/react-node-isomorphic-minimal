import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NoMatch.scss';

const NoMatch = ({ routes }) => (
  <>
    <h1>404 - Not Found</h1>
    <h3>Try one of these instead:</h3>
    <ul className="no-list-style">
      {routes.map(({ path }) => <li key={path}><Link to={path}>{path}</Link></li>)}
    </ul>
  </>
);

NoMatch.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object)
};

NoMatch.defaultProps = {
  routes: []
};

export default NoMatch;
