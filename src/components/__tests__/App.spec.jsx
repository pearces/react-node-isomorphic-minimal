import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('NoMatch', () => {
  it('matches component snapshot', () => {
    const html = render(
      <App>
        <div />
      </App>
    );
    const tree = html.asFragment();
    expect(tree).toMatchSnapshot();
  });
});
