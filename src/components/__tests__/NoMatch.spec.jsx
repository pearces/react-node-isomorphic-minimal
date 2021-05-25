import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import NoMatch from '../NoMatch';

describe('NoMatch', () => {
  const routes = [
    { path: '/', component: <div /> },
    { path: '/foo', component: <div /> }
  ];

  it('matches component snapshot', () => {
    const html = renderer.create(<Router><NoMatch routes={routes} /></Router>);
    const tree = html.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders routes as links', () => {
    const noMatch = shallow(<NoMatch routes={routes} />);
    expect(noMatch.find('Link').length).toEqual(routes.length);
  });
});
