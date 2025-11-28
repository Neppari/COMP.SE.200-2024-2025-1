//Created with chatGPT 5 mini

import add from '../src/add.js';

describe('add', () => {
    test('adds two positive integers', () => {
        expect(add(6, 4)).toBe(10);
    });

    test('adds zeros', () => {
        expect(add(0, 0)).toBe(0);
    });

    test('adds negative and positive numbers', () => {
        expect(add(-3, 3)).toBe(0);
    });

    test('adds floating point numbers', () => {
        expect(add(1.5, 2.5)).toBeCloseTo(4);
    });

    test('is commutative', () => {
        expect(add(7, 2)).toBe(add(2, 7));
    });

    test('propagates NaN', () => {
        expect(add(NaN, 1)).toBeNaN();
        expect(add(1, NaN)).toBeNaN();
    });

    test('handles infinities', () => {
        expect(add(Infinity, 1)).toBe(Infinity);
        expect(add(Infinity, -Infinity)).toBeNaN();
    });
});