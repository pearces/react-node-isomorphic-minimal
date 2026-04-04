import React from 'react';
import { render } from '@testing-library/react';
import Lazy from '../Lazy';

describe('Lazy', () => {
  it('matches component snapshot', () => {
    const html = render(<Lazy />);
    const tree = html.asFragment();
    expect(tree).toMatchSnapshot();
  });
});
