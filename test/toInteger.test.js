import toInteger from '../src/toInteger.js';

describe('toInteger tests', () => {
  test('converts positive floating point number 3.2 to integer 3', () => {
    expect(toInteger(3.2)).toBe(3);
  });

  test('converts negative floating point number -3.7 to integer -3', () => {
    expect(toInteger(-3.7)).toBe(-3);
  });

  test('converts numeric string "5" to integer 5', () => {
    expect(toInteger('5')).toBe(5);
  });

  test('returns 0 for non-numeric string "ab"', () => {
    expect(toInteger('ab')).toBe(0);
  });

  test('returns 0 for NaN', () => {
    expect(toInteger(NaN)).toBe(0);
  });

  test('returns 0 for null', () => {
    expect(toInteger(null)).toBe(0);
  });

  test('returns 0 for empty array []', () => {
    expect(toInteger([])).toBe(0);
  });
});