import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

const App = ({ children }) => (
  <>{children}</>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
