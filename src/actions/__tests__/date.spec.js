import { GET_DATE, getDate } from 'actions/date';

describe('date actions', () => {
  it('getDate', () => {
    const result = getDate();
    expect(result.type).toEqual(GET_DATE);
    expect(result.fetch).toBeTruthy();
  });
});
