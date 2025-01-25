import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import NoMatch from '../NoMatch';

describe('NoMatch', () => {
  const routes = [
    { path: '/', element: <div /> },
    { path: '/foo', element: <div /> }
  ];

  it('matches component snapshot', () => {
    const html = renderer.create(
      <Router>
        <NoMatch routes={routes} />
      </Router>
    );
    const tree = html.toJSON();
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
