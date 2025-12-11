import add from '../src/add.js';

describe('add tests', () => {
  test('adds two numbers together', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two negative numbers together', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('adds a positive and a negative number together', () => {
    expect(add(2, -3)).toBe(-1);
  });

  test('add floating point and integer together', () => {
    expect(add(1.5, 2)).toBe(3.5);
  });

  test('add zero and a number together', () => {
    expect(add(0, 2)).toBe(2);
  });

  test('add minus zero and a number together', () => {
    expect(add(-0, 2)).toBe(2);
  });

  test('adds two strings together throws TypeError', () => {
    expect(() => add("hello", "world")).toBe(NaN);
  });

  test('adds a number and a string together throws TypeError', () => {
    expect(() => add(2, "3")).toBe(NaN);
  });
});