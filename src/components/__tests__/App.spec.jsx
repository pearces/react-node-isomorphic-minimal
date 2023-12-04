import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('NoMatch', () => {
  it('matches component snapshot', () => {
    const html = renderer.create(
      <App>
        <div />
      </App>
    );
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
