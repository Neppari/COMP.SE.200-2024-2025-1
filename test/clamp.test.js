import clamp from '../src/clamp.js';

describe('clamp', () => {
  test('clamps 5 between 0 and 10', () => {
    // 5 is within [0, 10], so it should stay 5
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test('clamps -1 between 0 and 10', () => {
    // -1 is below 0, so it should clamp up to the lower bound 0
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  test('clamps 15 between 0 and 10', () => {
    // 15 is above 10, so it should clamp down to the upper bound 10
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test('handles non-number "a" with bounds 0 and 5 (NaN coerces to 0)', () => {
    expect(clamp('a', 0, 5)).toBeNaN();
  });

  test('clamps 5 when lower is null (treated as 0)', () => {
    // null lower bound is treated as 0; 5 in [0, 10] stays 5
    expect(clamp(5, null, 10)).toBe(5);
  });

  test('clamps string "5" between 0 and 10 (string coerced to number)', () => {
    // "5" is coerced to 5, which is within [0, 10], so result should be 5
    expect(clamp('5', 0, 10)).toBe(5);
  });

  test('clamps 0 between 0 and 0', () => {
    expect(clamp(0, 0, 0)).toBe(0);
  });
});