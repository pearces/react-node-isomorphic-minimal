import fetchMiddleware, { CALL_STATE } from '../fetchMiddleware';
import { mockFetch, pendingFetchMock } from '../__mocks__/fetchMock';

const { REQUESTED, SUCCESS, FAILED } = CALL_STATE;

describe('fetch middleware', () => {
  const next = jest.fn();

  beforeEach(() => {
    next.mockClear();
  });

  it('calls next on non-fetch action', () => {
    const action = { type: 'foo' };
    fetchMiddleware()(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls next on pending action fetch', () => {
    const type = 'pending_fetch';
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = pendingFetchMock;
    fetchMiddleware()(next)(action);
    expect(next).toHaveBeenCalledWith({ type: `${type}_${REQUESTED}` });
  });

  it('calls next on successful action fetch (json)', (done) => {
    const type = 'success_fetch';
    const response = new Date();
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = mockFetch(true, response);
    fetchMiddleware()(next)(action);

    expect.assertions(1);
    setTimeout(() => {
      expect(next).toHaveBeenLastCalledWith({ type: `${type}_${SUCCESS}`, payload: response });
      done();
    }, 0);
  });

  it('calls next on failed action fetch', (done) => {
    const type = 'failed_fetch';
    const error = 'call failed';
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = mockFetch(false, null, error);
    fetchMiddleware()(next)(action);

    expect.assertions(1);
    setTimeout(() => {
      const actionError = Error(error);
      expect(next).toHaveBeenLastCalledWith({ type: `${type}_${FAILED}`, error: actionError, payload: actionError });
      done();
    }, 0);
  });
});
