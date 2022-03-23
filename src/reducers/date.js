import { GET_DATE } from 'actions/date';

export const DEFAULT_STATE = {};

export const CALL_STATUS = {
  PENDING: 'pending',
  COMPLETE: 'complete',
  FAILED: 'failed'
};

export default (state = DEFAULT_STATE, action) => { // eslint-disable-line default-param-last
  const { PENDING, COMPLETE, FAILED } = CALL_STATUS;

  switch (action.type) {
    case `${GET_DATE}_REQUESTED`:
      return { ...state, status: PENDING, message: '' };
    case `${GET_DATE}_SUCCESS`:
      return { ...state, status: COMPLETE, message: Date(action.payload) };
    case `${GET_DATE}_FAILED`:
      return { ...state, status: FAILED, message: action.error.message };
    default:
      return state;
  }
};
