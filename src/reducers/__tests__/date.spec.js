import { GET_DATE } from 'actions/date';
import reducer, { DEFAULT_STATE, CALL_STATUS } from 'reducers/date';
import { CALL_STATE } from '../../fetchMiddleware';

const { REQUESTED, SUCCESS, FAILED } = CALL_STATE;

describe('date reducer', () => {
  it('date requested state', () => {
    const state = reducer(DEFAULT_STATE, { type: `${GET_DATE}_${REQUESTED}` });
    const { status, message } = state;
    expect(message).toBeFalsy();
    expect(status).toEqual(CALL_STATUS.PENDING);
  });

  it('date success state', () => {
    const payload = Date.now();
    const state = reducer(DEFAULT_STATE, { type: `${GET_DATE}_${SUCCESS}`, payload });
    const { status, message } = state;
    expect(message).toEqual(Date(payload));
    expect(status).toEqual(CALL_STATUS.COMPLETE);
  });

  it('date failed state', () => {
    const payload = Date.now();
    const error = {
      message: 'API fail'
    };
    const state = reducer(DEFAULT_STATE, { type: `${GET_DATE}_${FAILED}`, payload, error });
    const { status, message } = state;
    expect(message).toEqual(error.message);
    expect(status).toEqual(CALL_STATUS.FAILED);
  });

  it('default action', () => {
    const state = reducer(DEFAULT_STATE, { type: 'bar' });
    expect(state).toEqual(DEFAULT_STATE);
  });
});
