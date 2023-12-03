// eslint-disable-next-line default-param-last
export const mockFetch = (success = true, response, error, json = true) =>
  jest.fn(() =>
    success
      ? Promise.resolve(
          json ? { json: () => Promise.resolve(response) } : Promise.resolve(response)
        )
      : Promise.reject(Error(error))
  );

export const pendingFetchMock = () => new Promise(() => {});
