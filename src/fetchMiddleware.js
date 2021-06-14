const fetchMiddleware = () => (next) => (action) => {
  const { type, fetch: fetchAction, ...rest } = action;

  if (!fetchAction) return next(action);

  const [REQUESTED, SUCCESS, FAILED] = [`${type}_REQUESTED`, `${type}_SUCCESS`, `${type}_FAILED`];
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
