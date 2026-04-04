import type { Middleware } from 'redux';

export const CALL_STATE = {
  REQUESTED: 'REQUESTED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
} as const;

type FetchAction = {
  type: string;
  fetch?: {
    url: string;
    options?: RequestInit;
  };
  [key: string]: unknown;
};

const fetchMiddleware: Middleware<unknown, unknown> = () => (next) => (action) => {
  const { type, fetch: fetchAction, ...rest } = action as FetchAction;

  if (!fetchAction) return next(action);

  const [REQUESTED, SUCCESS, FAILED] = [
    `${type}_${CALL_STATE.REQUESTED}`,
    `${type}_${CALL_STATE.SUCCESS}`,
    `${type}_${CALL_STATE.FAILED}`
  ];
  const { url, options } = fetchAction;

  next({ type: REQUESTED });
  return fetch(url, options)
    .then((response) => (response.json ? response.json() : response))
    .then((data) => next({ type: SUCCESS, ...rest, payload: data }))
    .catch((error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return next({
        type: FAILED,
        ...rest,
        error: Error(errorMessage),
        payload: Error(errorMessage)
      });
    });
};

export default fetchMiddleware;
