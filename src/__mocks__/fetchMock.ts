import { jest } from '@jest/globals';

type FetchMock = jest.Mock<(...args: [RequestInfo | URL, RequestInit?]) => Promise<Response>>;

const MockFetch = jest.fn<
  (...args: [RequestInfo | URL, RequestInit?]) => Promise<Response>
>() as unknown as FetchMock;

const successFetchMock = (response: unknown, json = true): FetchMock => {
  const mockResponse = {
    ok: true,
    status: 200,
    json: json ? jest.fn<() => Promise<unknown>>().mockResolvedValue(response) : undefined,
    text: !json ? jest.fn<() => Promise<unknown>>().mockResolvedValue(response) : undefined
  } as unknown as Response;

  MockFetch.mockResolvedValue(mockResponse);
  return MockFetch;
};

const errorFetchMock = (error: unknown): FetchMock => {
  const mockResponse = {
    ok: false,
    status: 500,
    json: jest.fn<() => Promise<unknown>>().mockRejectedValue(error),
    text: jest.fn<() => Promise<unknown>>().mockRejectedValue(error)
  } as unknown as Response;

  MockFetch.mockResolvedValue(mockResponse);
  return MockFetch;
};

const pendingFetchMock = jest.fn<(...args: [RequestInfo | URL, RequestInit?]) => Promise<never>>(
  () => new Promise<never>(() => null)
) as unknown as FetchMock;

export { MockFetch, successFetchMock, errorFetchMock, pendingFetchMock };
