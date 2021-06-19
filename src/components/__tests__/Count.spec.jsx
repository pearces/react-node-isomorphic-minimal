import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import { CALL_STATUS } from 'reducers/date';
import Count from '../Count';
import fetchMiddleware from '../../fetchMiddleware';
import { mockFetch, pendingFetchMock } from '../../__mocks__/fetchMock';

const { PENDING, COMPLETE, FAILED } = CALL_STATUS;

describe('Count', () => {
  let useEffect;
  let store;

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockClear();

    global.fetch = mockFetch();

    store = createStore(rootReducer, { count: 0, date: {} }, applyMiddleware(fetchMiddleware));
  });

  it('matches component snapshot', () => {
    const app = renderer.create(<Provider store={store}><Count /></Provider>);
    const tree = app.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles redux store state button clicks', () => {
    const app = mount(<Provider store={store}><Count /></Provider>);
    const section = app.find('section').at(0);
    section.find('button').simulate('click');

    const expectedCount = 1;
    expect(section.find('p').text()).toEqual(`The button has been clicked ${expectedCount} times.`);
    expect(store.getState().count).toEqual(expectedCount);
    expect(useEffect).toHaveBeenLastCalledWith(expect.any(Function), [expectedCount]);
    expect(document.title.endsWith(`(${expectedCount})`)).toBe(true);
  });

  it('handles component state button clicks', () => {
    const app = mount(<Provider store={store}><Count /></Provider>);
    const section = app.find('section').at(1);
    section.find('button').simulate('click');

    const expectedCount = 1;
    expect(section.find('p').text()).toEqual(`The button has been clicked ${expectedCount} times.`);
    expect(useEffect).toHaveBeenLastCalledWith(expect.any(Function), [0]);
    expect(document.title.endsWith('(0)')).toBe(true);
  });

  it('handles component API call button clicks with pending response', (done) => {
    global.fetch = pendingFetchMock;
    const app = mount(<Provider store={store}><Count /></Provider>);
    const section = app.find('section').at(2);
    section.find('button').simulate('click');
    setTimeout(() => {
      expect(section.find('p').text().includes(PENDING)).toEqual(true);
      done();
    }, 0);
  });

  it('handles component API call button clicks with successful response', (done) => {
    const mockDate = Date.now();
    global.fetch = mockFetch(true, mockDate);
    const app = mount(<Provider store={store}><Count /></Provider>);
    const section = app.find('section').at(2);
    section.find('button').simulate('click');
    setTimeout(() => {
      const text = section.find('p').text();
      expect(text.includes(COMPLETE)).toEqual(true);
      expect(text.includes(Date(mockDate))).toEqual(true);
      done();
    }, 0);
  });

  it('handles component API call button clicks with failed response', (done) => {
    const mockApiError = 'API call failed';
    global.fetch = mockFetch(false, null, mockApiError);
    const app = mount(<Provider store={store}><Count /></Provider>);
    const section = app.find('section').at(2);
    section.find('button').simulate('click');
    setTimeout(() => {
      const text = section.find('p').text();
      expect(text.includes(FAILED)).toEqual(true);
      expect(text.includes(mockApiError)).toEqual(true);
      done();
    }, 0);
  });
});
