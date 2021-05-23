import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import RouteConfig, { routes } from '../routes';

describe('routes', () => {
  it('routes list', () => {
    expect(routes.length).toBeTruthy();
  });

  describe('RouteConfig', () => {
    it('finds a match for the first route', () => {
      const firstPath = routes[0].path;
      const router = mount(<Router location={firstPath}><RouteConfig /></Router>);
      expect(router.find('Route').length).toEqual(1);
      expect(router.find('NoMatch').length).toEqual(0);
    });

    it('gets a 404 when there is no matching route', () => {
      const router = mount(<Router location="/foo/bar/1"><RouteConfig /></Router>);
      expect(router.find('Route').length).toEqual(1);
      expect(router.find('NoMatch').length).toEqual(1);
    });
  });
});
