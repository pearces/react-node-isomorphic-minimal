import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  it('matches component snapshot', () => {
    const app = renderer.create(<App />);
    const tree = app.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles button clicks', () => {
    const app = shallow(<App />);
    app.find('button').simulate('click');
    expect(app.state('count')).toEqual(1);
  });
});
