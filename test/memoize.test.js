import memoize from '../src/memoize.js';

describe('memoize', () => {
  test('throws TypeError when func or resolver are not functions', () => {
    // Invalid func
    expect(() => memoize(123)).toThrow(TypeError);

    // Valid func but invalid resolver
    expect(() => memoize(() => {}, 123)).toThrow(TypeError);
  });
});





