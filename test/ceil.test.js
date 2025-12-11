import ceil from '../src/ceil.js';

describe('ceil tests', () => {
  test('rounds 4.006 up to 5', () => {
    expect(ceil(4.006)).toBe(5);
  });

  test('0 is returned for 0', () => {
    expect(ceil(0)).toBe(0);
  });

  test('0 is returned for -0', () => {
    expect(ceil(-0)).toBe(-0);
  });
  
  test('rounds -4.006 up to -4', () => {
    expect(ceil(-4.006)).toBe(-4);
  });

  test('expect TypeError when input is not a number', () => {
    expect(() => ceil("hello")).toBe(NaN);
  });

  test('expect result with string number as input', () => {
    expect(ceil("1.5")).toBe(2);
  });
});