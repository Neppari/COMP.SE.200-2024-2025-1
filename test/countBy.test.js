import countBy from '../src/countBy.js';

describe('countBy tests', () => {
  test('counts numbers by parity', () => {
    expect(countBy([1, 2, 3], x => x % 2)).toEqual({ 0: 1, 1: 2 });
  });

  test('counts strings by length', () => {
    expect(countBy(['a', 'bb', 'ccc'], x => x.length)).toEqual({ 1: 1, 2: 1, 3: 1 });
  });

  test('handles null collection as empty', () => {
    expect(countBy(null, x => x)).toEqual({});
  });

  test('throws TypeError when iteratee is not a function', () => {
    expect(() => countBy([1, 2], null)).toThrow(TypeError);
  });

  test('returns empty object for empty array', () => {
    expect(countBy([], x => x)).toEqual({});
  });

  test('counts undefined values correctly', () => {
    expect(countBy([undefined, undefined], x => x)).toEqual({ undefined: 2 });
  });
});