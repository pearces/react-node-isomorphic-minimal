export const GET_DATE = 'GET_DATE';

export const getDate = () => ({
  type: GET_DATE,
  fetch: {
    url: '/date',
    options: { method: 'GET' }
  }
});
