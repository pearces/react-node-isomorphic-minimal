import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Count from '../Count';

describe('Count', () => {
  it('matches component snapshot', () => {
    const app = renderer.create(<Count />);
    const tree = app.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles button clicks', () => {
    const app = shallow(<Count />);
    app.find('button').simulate('click');
    expect(app.state('count')).toEqual(1);
  });
});
