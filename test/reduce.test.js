import reduce from '../src/reduce.js';

describe('reduce tests', () => {
  test('calculates total price from a shopping cart', () => {
    const cart = [
      { price: 10, quantity: 2 }, // 20
      { price: 5, quantity: 1 },  // 5
    ];

    const total = reduce(
      cart,
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    expect(total).toBe(25);
  });

  test('sums an array of numbers with an explicit initial value', () => {
    expect(reduce([1, 2, 3], (a, b) => a + b, 0)).toBe(6);
  });

  test('throws TypeError when iteratee is not a function', () => {
    expect(() => reduce([1, 2], null, 0)).toThrow(TypeError);
  });

  test('uses first element as initial accumulator when not provided', () => {
    const result = reduce([1], (a, b) => a + b);
    expect(result).toBe(1);
  });
});

