import React from 'react';
import renderer from 'react-test-renderer';
import Lazy from '../Lazy';

describe('Lazy', () => {
  it('matches component snapshot', () => {
    const html = renderer.create(<Lazy />);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
