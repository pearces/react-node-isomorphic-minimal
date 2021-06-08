import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Html from '../Html';

describe('Html', () => {
  it('matches component snapshot', () => {
    const html = renderer.create(<Html><div /></Html>);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with stylesheets', () => {
    const stylesheets = ['foo.css'];
    const html = shallow(<Html stylesheets={stylesheets}><div /></Html>);
    expect(html.find('link').findWhere((link) => link.prop('href').includes(stylesheets[0])).length).toEqual(1);
  });

  it('renders with scripts', () => {
    const scripts = ['bar.js'];
    const html = shallow(<Html scripts={scripts}><div /></Html>);
    expect(html.find('script').findWhere((script) => script.prop('src').includes(scripts[0])).length).toEqual(1);
  });

  it('renders with inline css', () => {
    const styles = 'html {background: "#fff"}';
    const html = shallow(<Html inlineCss={styles}><div /></Html>);
    expect(html.find('style').text()).toEqual(styles);
  });

  it('renders with inline script', () => { /* eslint-disable no-underscore-dangle */
    const scripts = ['console.log("foo")'];
    const html = shallow(<Html inlineScripts={scripts}><div /></Html>);
    expect(html.find('script').props().dangerouslySetInnerHTML.__html).toEqual(scripts[0]);
  });
});
