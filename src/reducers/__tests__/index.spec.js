import rootReducer from '..';

describe('reducers index', () => {
  it('checks for root reducer', () => {
    expect(typeof rootReducer).toEqual('function');
  });
});
