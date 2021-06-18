export const CALL_STATE = {
  REQUESTED: 'REQUESTED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

const fetchMiddleware = () => (next) => (action) => {
  const { type, fetch: fetchAction, ...rest } = action;

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
    .catch((error) => next({
      type: FAILED,
      ...rest,
      error,
      payload: error
    }));
};

export default fetchMiddleware;
