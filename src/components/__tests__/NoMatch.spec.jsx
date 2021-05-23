import React from 'react';
import renderer from 'react-test-renderer';
import NoMatch from '../NoMatch';

describe('NoMatch', () => {
  it('matches component snapshot', () => {
    const html = renderer.create(<NoMatch />);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
