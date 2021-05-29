import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Count from '../Count';

describe('Count', () => {
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');

    mockUseEffect();
    useEffect.mockClear();
  });

  it('matches component snapshot', () => {
    const app = renderer.create(<Count />);
    const tree = app.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles button clicks', () => {
    const app = shallow(<Count />);
    app.find('button').simulate('click');
    expect(app.find('div').text()).toEqual('The button has been clicked 1 times.');
    expect(useEffect).toHaveBeenCalledTimes(2);
    expect(document.title.includes('(0)')).toBe(true);
  });
});
