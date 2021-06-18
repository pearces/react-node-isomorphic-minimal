import { INCREMENT, increment } from 'actions/count';

describe('count actions', () => {
  it('increment', () => {
    const result = increment();
    expect(result.type).toEqual(INCREMENT);
  });
});
