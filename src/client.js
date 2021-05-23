import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import RouteConfig from './routes';

ReactDOM.hydrate(
  <Router>
    <App><RouteConfig /></App>
  </Router>,
  document.getElementById('app')
);
