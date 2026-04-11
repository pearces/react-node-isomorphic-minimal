import { GET_DATE } from 'actions/date';

export interface DateState {
  status?: string;
  message?: string;
  error?: string;
}

export const DEFAULT_STATE: DateState = {};

export const CALL_STATUS = {
  PENDING: 'pending',
  COMPLETE: 'complete',
  FAILED: 'failed'
} as const;

export type DateAction =
  | { type: `${typeof GET_DATE}_REQUESTED` }
  | { type: `${typeof GET_DATE}_SUCCESS`; payload: string | number }
  | { type: `${typeof GET_DATE}_FAILED`; error: { message?: string } }
  | { type: string };

const date = (state = DEFAULT_STATE, action: DateAction): DateState => {
  const { PENDING, COMPLETE, FAILED } = CALL_STATUS;

  switch (action.type) {
    case `${GET_DATE}_REQUESTED`:
      return { ...state, status: PENDING, message: '' };
    case `${GET_DATE}_SUCCESS`:
      return {
        ...state,
        status: COMPLETE,
        message: String(new Date((action as { payload: string | number }).payload))
      };
    case `${GET_DATE}_FAILED`:
      return {
        ...state,
        status: FAILED,
        message: (action as { error?: { message?: string } }).error?.message ?? ''
      };
    default:
      return state;
  }
};

export default date;
