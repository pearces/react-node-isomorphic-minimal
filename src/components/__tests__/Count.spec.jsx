import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import Count from '../Count';

describe('Count', () => {
  let useEffect;
  let store;

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockClear();

    store = createStore(rootReducer, { count: 0, date: {} });
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
});
