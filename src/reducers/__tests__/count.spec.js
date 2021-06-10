import { INCREMENT } from 'actions/count';
import reducer, { DEFAULT_STATE } from '../count';

describe('count reducer', () => {
  it(`${INCREMENT} action`, () => {
    const state = reducer(DEFAULT_STATE, { type: INCREMENT });
    expect(state).toEqual(1);
  });

  it('default action', () => {
    const state = reducer(DEFAULT_STATE, { type: 'foo' });
    expect(state).toEqual(DEFAULT_STATE);
  });
});
