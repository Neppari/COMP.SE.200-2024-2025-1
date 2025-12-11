import filter from '../src/filter.js';

describe('filter tests', () => {
  test('filters numbers greater than 1', () => {
    expect(filter([1, 2, 3], x => x > 1)).toEqual([2, 3]);
  });

  test('filters strings equal to "a"', () => {
    expect(filter(['a', 'b'], x => x === 'a')).toEqual(['a']);
  });

  test('treats null array as empty and returns empty array', () => {
    expect(filter(null, () => true)).toEqual([]);
  });

  test('treats non-array object as empty and returns empty array', () => {
    expect(filter({}, () => true)).toEqual([]);
  });

  test('returns empty array when input array is empty', () => {
    expect(filter([], x => true)).toEqual([]);
  });

  test('filters out falsy undefined and null values', () => {
    expect(filter([undefined, null], x => x)).toEqual([]);
  });
});
