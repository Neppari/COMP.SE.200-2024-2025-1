import eq from '../src/eq.js';

describe('eq tests', () => {
  test('1 and 1 are equal', () => {
    expect(eq(1, 1)).toBe(true);
  });

  test('"a" and "a" are equal', () => {
    expect(eq('a', 'a')).toBe(true);
  });

  test('NaN and NaN are treated as equal (SameValueZero)', () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  test('0 and -0 are equal', () => {
    expect(eq(0, -0)).toBe(true);
  });

  test('1 and string 1 are not equal by intended contract', () => {
    expect(eq(1, '1')).toBe(false);
  });

  test('two different object literals are not equal', () => {
    expect(eq({}, {})).toBe(false);
  });
});