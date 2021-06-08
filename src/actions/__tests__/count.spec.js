import { INCREMENT, increment } from '../count';

describe('count actions', () => {
  it('increment', () => {
    const result = increment();
    expect(result.type).toEqual(INCREMENT);
  });
});
