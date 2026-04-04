import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import NoMatch from '../NoMatch';

describe('NoMatch', () => {
  const routes = [
    { path: '/', element: <div /> },
    { path: '/foo', element: <div /> }
  ];

  it('matches component snapshot', () => {
    const html = render(
      <Router>
        <NoMatch routes={routes} />
      </Router>
    );
    const tree = html.asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('renders routes as links', () => {
    render(
      <Router>
        <NoMatch routes={routes} />
      </Router>
    );
    expect(screen.queryAllByRole('link').length).toEqual(routes.length);
  });
});
