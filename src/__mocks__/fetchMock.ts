type FetchMock = jest.Mock<Promise<Response>, [RequestInfo | URL, RequestInit?]>;

const MockFetch = jest.fn() as FetchMock;

const successFetchMock = (response: unknown, json = true): FetchMock => {
  const mockResponse = {
    ok: true,
    status: 200,
    json: json ? jest.fn().mockResolvedValue(response) : undefined,
    text: !json ? jest.fn().mockResolvedValue(response) : undefined
  } as unknown as Response;

  MockFetch.mockResolvedValue(mockResponse);
  return MockFetch;
};

const errorFetchMock = (error: unknown): FetchMock => {
  const mockResponse = {
    ok: false,
    status: 500,
    json: jest.fn().mockRejectedValue(error),
    text: jest.fn().mockRejectedValue(error)
  } as unknown as Response;

  MockFetch.mockResolvedValue(mockResponse);
  return MockFetch;
};

const pendingFetchMock = jest.fn(() => new Promise<never>(() => null));

export { MockFetch, successFetchMock, errorFetchMock, pendingFetchMock };
