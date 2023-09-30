import React from 'react';
import renderer from 'react-test-renderer';
import { renderToString } from 'react-dom/server';
import Html from '../Html';

describe('Html', () => {
  const htmlComponentToDocument = (component) => {
    const html = renderToString(component);
    return new DOMParser().parseFromString(html, 'text/html');
  };

  it('matches component snapshot', () => {
    const html = renderer.create(<Html><div /></Html>);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with stylesheets', () => {
    const stylesheets = ['foo.css'];
    const document = htmlComponentToDocument(<Html stylesheets={stylesheets}><div /></Html>);
    expect(document.querySelectorAll(`link[href*='${stylesheets[0]}']`).length).toEqual(1);
  });

  it('renders with scripts', () => {
    const scripts = ['bar.js'];
    const document = htmlComponentToDocument(<Html scripts={scripts}><div /></Html>);
    expect(document.querySelectorAll(`script[src*='${scripts[0]}`).length).toEqual(1);
  });

  it('renders with inline css', () => {
    const styles = 'html {background: "#fff"}';
    const document = htmlComponentToDocument(<Html inlineCss={styles}><div /></Html>);
    expect(document.querySelector('style')).toBeTruthy();
  });

  it('renders with inline script', () => {
    const scripts = ['console.log("foo")'];
    const document = htmlComponentToDocument(<Html inlineScripts={scripts}><div /></Html>);
    expect(document.querySelector('script')).toBeTruthy();
  });
});
