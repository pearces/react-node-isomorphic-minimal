import { GET_DATE } from 'actions/date';

export const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case `${GET_DATE}_REQUESTED`:
      return { ...state, status: 'pending', message: '' };
    case `${GET_DATE}_SUCCESS`:
      return { ...state, status: 'complete', message: Date(action.payload) };
    case `${GET_DATE}_FAILED`:
      return { ...state, status: 'failed', message: action.error.message };
    default:
      return state;
  }
};
