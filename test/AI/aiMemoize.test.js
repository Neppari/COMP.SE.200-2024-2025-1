import memoize from '../../src/memoize.js';

describe('memoize (AI recommended tests)', () => {
  let OriginalCache;

  beforeEach(() => {
    OriginalCache = memoize.Cache;
  });

  afterEach(() => {
    memoize.Cache = OriginalCache;
  });

  describe('Type validation', () => {
    test('throws TypeError when func is not a function', () => {
      expect(() => memoize(42)).toThrow(TypeError);
      expect(() => memoize(null)).toThrow(TypeError);
      expect(() => memoize(undefined)).toThrow(TypeError);
      expect(() => memoize('not a function')).toThrow(TypeError);
      expect(() => memoize({})).toThrow(TypeError);
      expect(() => memoize([])).toThrow(TypeError);
    });

    test('throws TypeError when resolver is provided but is not a function', () => {
      const validFunc = x => x;
      expect(() => memoize(validFunc, 123)).toThrow(TypeError);
      expect(() => memoize(validFunc, 'not-a-function')).toThrow(TypeError);
      expect(() => memoize(validFunc, {})).toThrow(TypeError);
      expect(() => memoize(validFunc, [])).toThrow(TypeError);
    });

    test('allows null or undefined resolver', () => {
      const func = x => x * 2;
      expect(() => memoize(func, null)).not.toThrow();
      expect(() => memoize(func, undefined)).not.toThrow();
    });
  });

  describe('Basic memoization without resolver', () => {
    test('memoizes results based only on the first argument by default', () => {
      const fn = jest.fn((a, b) => a + b);
      const memoized = memoize(fn);

      const first = memoized(2, 3);   // computes 5
      const second = memoized(2, 99); // should NOT recompute, still 5

      expect(first).toBe(5);
      expect(second).toBe(5);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('recomputes when first argument (default key) changes', () => {
      const fn = jest.fn(a => a * 2);
      const memoized = memoize(fn);

      const r1 = memoized(1);
      const r2 = memoized(2);
      const r3 = memoized(1); // cached

      expect(r1).toBe(2);
      expect(r2).toBe(4);
      expect(r3).toBe(2);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('handles undefined as first argument', () => {
      const fn = jest.fn(() => 'result');
      const memoized = memoize(fn);

      const r1 = memoized(undefined);
      const r2 = memoized(undefined);

      expect(r1).toBe('result');
      expect(r2).toBe('result');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles null as first argument', () => {
      const fn = jest.fn(() => 'result');
      const memoized = memoize(fn);

      const r1 = memoized(null);
      const r2 = memoized(null);

      expect(r1).toBe('result');
      expect(r2).toBe('result');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Memoization with resolver', () => {
    test('uses resolver to build cache key', () => {
      const fn = jest.fn((a, b) => a + b);
      const resolver = (a, b) => [a, b].sort().join('-');
      const memoized = memoize(fn, resolver);

      const r1 = memoized(1, 2); // key "1-2"
      const r2 = memoized(2, 1); // same key "1-2" -> cached

      expect(r1).toBe(3);
      expect(r2).toBe(3);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('resolver receives all arguments', () => {
      const fn = jest.fn((a, b, c) => a + b + c);
      const resolver = jest.fn((a, b, c) => `${a}-${b}-${c}`);
      const memoized = memoize(fn, resolver);

      memoized(1, 2, 3);
      memoized(1, 2, 3);

      expect(resolver).toHaveBeenCalledWith(1, 2, 3);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('resolver can return any value as cache key', () => {
      const fn = jest.fn(x => x * 2);
      const resolver = () => 'constant-key';
      const memoized = memoize(fn, resolver);

      const r1 = memoized(5);
      const r2 = memoized(10); // same key -> cached

      expect(r1).toBe(10);
      expect(r2).toBe(10); // returns cached result from first call
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cache exposure and manipulation', () => {
    test('exposes cache property as Map instance', () => {
      const fn = x => x;
      const memoized = memoize(fn);

      expect(memoized.cache).toBeInstanceOf(Map);
    });

    test('supports non-primitive keys and exposes cache for manual manipulation', () => {
      const fn = jest.fn(obj => ({ sum: obj.a + obj.b }));
      const memoized = memoize(fn);

      const key = { a: 1, b: 2 };

      const first = memoized(key);
      expect(first).toEqual({ sum: 3 });
      expect(memoized.cache.has(key)).toBe(true);

      // Manually override cached value
      memoized.cache.set(key, { sum: 999 });
      const second = memoized(key);
      expect(second).toEqual({ sum: 999 });

      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('allows cache clearing', () => {
      const fn = jest.fn(x => x * 2);
      const memoized = memoize(fn);

      memoized(5);
      expect(memoized.cache.has(5)).toBe(true);

      memoized.cache.clear();
      expect(memoized.cache.has(5)).toBe(false);

      memoized(5); // recomputes
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('allows cache deletion', () => {
      const fn = jest.fn(x => x * 2);
      const memoized = memoize(fn);

      memoized(5);
      expect(memoized.cache.has(5)).toBe(true);

      memoized.cache.delete(5);
      expect(memoized.cache.has(5)).toBe(false);

      memoized(5); // recomputes
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('This binding', () => {
    test('preserves `this` binding when memoized function is called as a method', () => {
      const obj = {
        base: 10,
        compute: memoize(function (x) {
          return this.base + x;
        }),
      };

      const r1 = obj.compute(5);
      const r2 = obj.compute(5); // cached

      expect(r1).toBe(15);
      expect(r2).toBe(15);
    });

    test('preserves `this` binding in resolver', () => {
      const obj = {
        prefix: 'key-',
        resolver: memoize(function (x) {
          return this.prefix + x;
        }, function (x) {
          return this.prefix + x;
        }),
      };

      const result = obj.resolver(5);
      expect(result).toBe('key-5');
    });
  });

  describe('Custom cache constructor', () => {
    test('uses custom cache constructor when memoize.Cache is overridden', () => {
      class CustomCache extends Map {}

      const fn = x => x * 3;
      memoize.Cache = CustomCache;

      const memoized = memoize(fn);

      expect(memoized.cache).toBeInstanceOf(CustomCache);
      expect(memoized(3)).toBe(9);
      expect(memoized(3)).toBe(9); // cached
    });

    test('each memoized function gets its own cache instance', () => {
      const fn1 = x => x;
      const fn2 = x => x * 2;

      const memoized1 = memoize(fn1);
      const memoized2 = memoize(fn2);

      expect(memoized1.cache).not.toBe(memoized2.cache);
      expect(memoized1.cache instanceof Map).toBe(true);
      expect(memoized2.cache instanceof Map).toBe(true);
    });

    test('falls back to Map when memoize.Cache is falsy', () => {
      const fn = x => x;
      memoize.Cache = null;

      const memoized = memoize(fn);

      expect(memoized.cache).toBeInstanceOf(Map);
    });
  });

  describe('Edge cases and complex scenarios', () => {
    test('handles functions that return undefined', () => {
      const fn = jest.fn(() => undefined);
      const memoized = memoize(fn);

      const r1 = memoized(1);
      const r2 = memoized(1);

      expect(r1).toBeUndefined();
      expect(r2).toBeUndefined();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles functions that return null', () => {
      const fn = jest.fn(() => null);
      const memoized = memoize(fn);

      const r1 = memoized(1);
      const r2 = memoized(1);

      expect(r1).toBeNull();
      expect(r2).toBeNull();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles functions that return objects', () => {
      const fn = jest.fn(x => ({ value: x }));
      const memoized = memoize(fn);

      const r1 = memoized(1);
      const r2 = memoized(1);

      expect(r1).toEqual({ value: 1 });
      expect(r2).toBe(r1); // same reference
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles functions that return arrays', () => {
      const fn = jest.fn(x => [x, x * 2]);
      const memoized = memoize(fn);

      const r1 = memoized(2);
      const r2 = memoized(2);

      expect(r1).toEqual([2, 4]);
      expect(r2).toBe(r1); // same reference
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles zero arguments', () => {
      const fn = jest.fn(() => 'no-args');
      const memoized = memoize(fn);

      const r1 = memoized();
      const r2 = memoized();

      expect(r1).toBe('no-args');
      expect(r2).toBe('no-args');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles Symbol as cache key', () => {
      const fn = jest.fn(x => x);
      const memoized = memoize(fn);

      const sym = Symbol('test');
      const r1 = memoized(sym);
      const r2 = memoized(sym);

      expect(r1).toBe(sym);
      expect(r2).toBe(sym);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('handles falsy primitive return values', () => {
      const fn = jest.fn(x => x);
      const memoized = memoize(fn);

      const r0a = memoized(0);
      const r0b = memoized(0);
      const rf1 = memoized(false);
      const rf2 = memoized(false);

      expect(r0a).toBe(0);
      expect(r0b).toBe(0);
      expect(rf1).toBe(false);
      expect(rf2).toBe(false);
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('handles NaN return value', () => {
      const fn = jest.fn(() => NaN);
      const memoized = memoize(fn);

      const r1 = memoized(1);
      const r2 = memoized(1);

      expect(Number.isNaN(r1)).toBe(true);
      expect(Number.isNaN(r2)).toBe(true);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('different memoized functions maintain independent caches', () => {
      const fn1 = jest.fn(x => `A-${x}`);
      const fn2 = jest.fn(x => `B-${x}`);

      const memoized1 = memoize(fn1);
      const memoized2 = memoize(fn2);

      const r1a = memoized1(1);
      const r1b = memoized1(1);
      const r2a = memoized2(1);
      const r2b = memoized2(1);

      expect(r1a).toBe('A-1');
      expect(r1b).toBe('A-1');
      expect(r2a).toBe('B-1');
      expect(r2b).toBe('B-1');

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
    });
  });
});
