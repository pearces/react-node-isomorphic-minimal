import fetchMiddleware, { CALL_STATE } from '../fetchMiddleware';
import { successFetchMock, pendingFetchMock, errorFetchMock } from '../__mocks__/fetchMock';
import { waitFor } from '@testing-library/react';

const { REQUESTED, SUCCESS, FAILED } = CALL_STATE;

describe('fetch middleware', () => {
  const next = jest.fn();

  beforeEach(() => {
    next.mockClear();
  });

  it('calls next on non-fetch action', () => {
    const action = { type: 'foo' };
    fetchMiddleware({} as never)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls next on pending action fetch', () => {
    const type = 'pending_fetch';
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = pendingFetchMock;
    fetchMiddleware({} as never)(next)(action);
    expect(next).toHaveBeenCalledWith({ type: `${type}_${REQUESTED}` });
  });

  it('calls next on successful action fetch (json)', async () => {
    const type = 'success_fetch';
    const response = new Date();
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = successFetchMock(response);
    fetchMiddleware({} as never)(next)(action);

    expect.assertions(2);
    await waitFor(() => {
      expect(next).toHaveBeenLastCalledWith({ type: `${type}_${SUCCESS}`, payload: response });
    });
  });

  it('calls next on successful action fetch (text)', async () => {
    const type = 'success_fetch';
    const response = 'this is text';
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = successFetchMock(response);
    fetchMiddleware({} as never)(next)(action);

    expect.assertions(2);
    await waitFor(() =>
      expect(next).toHaveBeenLastCalledWith({ type: `${type}_${SUCCESS}`, payload: response })
    );
  });

  it('calls next on failed action fetch', async () => {
    const type = 'failed_fetch';
    const error = 'call failed';
    const action = { type, fetch: { url: 'localhost/api/foo', options: { method: 'GET' } } };
    global.fetch = errorFetchMock(error);
    fetchMiddleware({} as never)(next)(action);

    expect.assertions(2);
    await waitFor(() => {
      const actionError = Error(error);
      expect(next).toHaveBeenLastCalledWith({
        type: `${type}_${FAILED}`,
        error: actionError,
        payload: actionError
      });
    });
  });
});
