import React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { StaticRouter as Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import RouteConfig, { routes } from '../routes';
import rootReducer from '../reducers';
import fetchMiddleware from '../fetchMiddleware';
import { ThemeProvider } from '../context/ThemeContext';

jest.mock('components/Count', () => ({
  __esModule: true,
  default: () => <div id="counter" />
}));

describe('routes', () => {
  const renderWithProviders = (location: string) => {
    const store = createStore(
      rootReducer,
      { count: 0, date: {} },
      applyMiddleware(fetchMiddleware)
    );

    return render(
      <Router location={location}>
        <ThemeProvider>
          <Provider store={store}>
            <RouteConfig />
          </Provider>
        </ThemeProvider>
      </Router>
    );
  };

  it('routes list', () => {
    expect(routes.length).toBeTruthy();
  });

  describe('RouteConfig', () => {
    const notFoundText = '404 - Not Found';
    it('finds a match for the first route', () => {
      const firstPath = routes[0].path!;
      renderWithProviders(firstPath);
      expect(screen.queryByText(notFoundText)).toBeFalsy();
    });

    it('gets a 404 when there is no matching route', () => {
      renderWithProviders('/foo/bar/1');
      expect(screen.queryByText(notFoundText)).toBeTruthy();
    });
  });
});
