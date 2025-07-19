import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import { CALL_STATUS } from 'reducers/date';
import Count from '../Count';
import fetchMiddleware from '../../fetchMiddleware';
import { mockFetch, pendingFetchMock } from '../../__mocks__/fetchMock';
import { ThemeProvider } from '../../context/ThemeContext';
import { THEMES } from '../../constants';

const { PENDING, COMPLETE, FAILED } = CALL_STATUS;

describe('Count', () => {
  let useEffect;
  let store;
  let appContainer;

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockClear();

    global.fetch = mockFetch();

    store = createStore(rootReducer, { count: 0, date: {} }, applyMiddleware(fetchMiddleware));

    appContainer = (
      <ThemeProvider>
        <Provider store={store}>
          <Count />
        </Provider>
      </ThemeProvider>
    );
  });

  it('matches component snapshot', () => {
    const app = render(appContainer);
    const tree = app.asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('handles redux store state button clicks', async () => {
    const app = render(appContainer).container;
    const section = app.querySelector('section');
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));

    const expectedCount = 1;
    expect(screen.queryByText(`The button has been clicked ${expectedCount} times.`)).toBeTruthy();
    expect(store.getState().count).toEqual(expectedCount);
    expect(useEffect).toHaveBeenLastCalledWith(expect.any(Function), [expectedCount]);
    expect(document.title.endsWith(`(${expectedCount})`)).toBe(true);
  });

  it('handles component state button clicks', async () => {
    const app = render(appContainer).container;
    const section = app.querySelectorAll('section')[1];
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));

    const expectedCount = 1;
    expect(screen.queryByText(`The button has been clicked ${expectedCount} times.`)).toBeTruthy();
    expect(useEffect).toHaveBeenLastCalledWith(expect.any(Function), [0]);
    expect(document.title.endsWith('(0)')).toBe(true);
  });

  it('handles component API call button clicks with pending response', async () => {
    global.fetch = pendingFetchMock;
    const app = render(appContainer).container;
    const section = app.querySelectorAll('section')[2];
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));
    await waitFor(() => expect(screen.queryByText(RegExp(PENDING))).toBeTruthy());
  });

  it('handles component API call button clicks with successful response', async () => {
    const mockDate = Date.now();
    global.fetch = mockFetch(true, mockDate);
    const app = render(appContainer).container;
    const section = app.querySelectorAll('section')[2];
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));

    await waitFor(() => expect(screen.queryByText(RegExp(COMPLETE))).toBeTruthy());
    await waitFor(() =>
      expect(screen.queryByText(RegExp(Date(mockDate).match(/.*GMT/)))).toBeTruthy()
    );
  });

  it('handles component API call button clicks with failed response', async () => {
    const mockApiError = 'API call failed';
    global.fetch = mockFetch(false, null, mockApiError);
    const app = render(appContainer).container;
    const section = app.querySelectorAll('section')[2];
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));

    await waitFor(() => expect(screen.queryByText(RegExp(FAILED))).toBeTruthy());
    await waitFor(() => expect(screen.queryByText(RegExp(mockApiError))).toBeTruthy());
  });

  it('waits for lazy loaded component', async () => {
    render(appContainer);
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../), { timeout: 2500 });
    await waitFor(() =>
      expect(screen.queryByText(/This is a lazy loaded component./)).toBeTruthy()
    );
  });

  it('handles theme toggle button clicks', async () => {
    const app = render(appContainer).container;
    const section = app.querySelectorAll('section')[4];
    const user = userEvent.setup();
    await user.click(section.querySelector('button'));

    const expectedTheme = THEMES.DARK;
    expect(screen.queryByText(`The current theme is ${expectedTheme}.`)).toBeTruthy();
  });
});
