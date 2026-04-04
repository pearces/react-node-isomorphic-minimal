import * as constants from '../constants';

describe('constants', () => {
  it('checks for exports', () => {
    expect(constants).not.toBeUndefined();
    expect(constants.DEFAULT_PORT).toBeTruthy();
  });
});
