import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Html from '../Html';

describe('Html', () => {
  it('matches component snapshot', () => {
    const html = renderer.create(<Html><div /></Html>);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with stylesheets', () => {
    const stylesheets = ['foo.css'];
    const html = render(<Html stylesheets={stylesheets}><div /></Html>).container;
    expect(html.querySelectorAll(`link[href*='${stylesheets[0]}']`).length).toEqual(1);
  });

  it('renders with scripts', () => {
    const scripts = ['bar.js'];
    const html = render(<Html scripts={scripts}><div /></Html>).container;
    expect(html.querySelectorAll(`script[src*='${scripts[0]}`).length).toEqual(1);
  });

  it('renders with inline css', () => {
    const styles = 'html {background: "#fff"}';
    render(<Html inlineCss={styles}><div /></Html>);
    expect(document.querySelector('style')).toBeTruthy(); // need to get via document
  });

  it('renders with inline script', () => {
    const scripts = ['console.log("foo")'];
    render(<Html inlineScripts={scripts}><div /></Html>);
    expect(document.querySelector('script')).toBeTruthy(); // need to get via document
  });
});
