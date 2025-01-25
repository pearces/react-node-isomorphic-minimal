import React from 'react';
import { StaticRouter as Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import RouteConfig, { routes } from '../routes';

jest.mock('components/Count', () => ({
  __esModule: true,
  default: () => <div id="counter" />
}));

describe('routes', () => {
  it('routes list', () => {
    expect(routes.length).toBeTruthy();
  });

  describe('RouteConfig', () => {
    const notFoundText = '404 - Not Found';
    it('finds a match for the first route', () => {
      const firstPath = routes[0].path;
      const router = render(
        <Router location={firstPath}>
          <RouteConfig />
        </Router>
      ).container;
      expect(router.querySelectorAll('#counter').length).toEqual(1);
      expect(screen.queryByText(notFoundText)).toBeFalsy();
    });

    it('gets a 404 when there is no matching route', () => {
      render(
        <Router location="/foo/bar/1">
          <RouteConfig />
        </Router>
      );
      expect(screen.queryByText(notFoundText)).toBeTruthy();
    });
  });
});
