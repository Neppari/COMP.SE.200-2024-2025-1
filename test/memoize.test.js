//Based on part 1 test plan documentation
import memoize from '../src/memoize.js';

describe('memoize', () => {
  test('throws TypeError when function or resolver are not functions', () => {
    // Invalid func
    expect(() => memoize(123)).toThrow(TypeError);

    // Valid func but invalid resolver
    expect(() => memoize(() => {}, 123)).toThrow(TypeError);
  });

  test('returns expected result with valid function and resolver', () => {
    const ValidFuncA = (a, b) => a + b;
    const ValidResolverA = (a, b) => `${a}-${b}`;

    const memoized = memoize(ValidFuncA, ValidResolverA);

    expect(memoized(2, 3)).toBe(5);
  });

  test('returns cached result on subsequent calls with same key', () => {
    let callCount = 0;
    const ValidFuncA = (a, b) => {
      callCount += 1;
      return a + b;
    };
    const ValidResolverA = (a, b) => `${a}-${b}`;

    const memoized = memoize(ValidFuncA, ValidResolverA);

    const firstResult = memoized(2, 3);
    const secondResult = memoized(2, 3);

    expect(firstResult).toBe(5);
    expect(secondResult).toBe(5);
    expect(callCount).toBe(1);
  });

  test('different memoized functions with same resolver do not interfere and cache independently', () => {
    const ValidResolverA = (value) => value;

    let callCountA = 0;
    const ValidFuncA = (value) => {
      callCountA += 1;
      return `A-${value}`;
    };

    let callCountB = 0;
    const ValidFuncB = (value) => {
      callCountB += 1;
      return `B-${value}`;
    };

    // 1st call: use ValidFuncA & ValidResolverA
    const memoizedA = memoize(ValidFuncA, ValidResolverA);
    const resultA = memoizedA(1);

    // 2nd & 3rd call: use ValidFuncB & ValidResolverA
    const memoizedB = memoize(ValidFuncB, ValidResolverA);
    const resultB1 = memoizedB(1);
    const resultB2 = memoizedB(1);

    // Ensure different functions don't interfere
    expect(resultA).toBe('A-1');
    expect(resultB1).toBe('B-1');

    // 3rd call returns cached value from 2nd call
    expect(resultB2).toBe('B-1');

    // Call counts verify cache behavior and no interference
    expect(callCountA).toBe(1);
    expect(callCountB).toBe(1);
  });
});