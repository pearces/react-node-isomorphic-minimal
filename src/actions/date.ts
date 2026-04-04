export const GET_DATE = 'GET_DATE' as const;

export type GetDateAction = {
  type: typeof GET_DATE;
  fetch: {
    url: string;
    options: {
      method: 'GET';
    };
  };
};

export const getDate = (): GetDateAction => ({
  type: GET_DATE,
  fetch: {
    url: '/date',
    options: { method: 'GET' }
  }
});
