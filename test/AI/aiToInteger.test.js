//Created with chatGPT 5 mini

import toInteger from '../../src/toInteger.js';

// Basic test cases for toInteger function
describe('toInteger (AI recommended tests)', () => {
    it('should convert various values to integers', () => {
        expect(toInteger(3.2)).toBe(3);
        expect(toInteger(-3.8)).toBe(-3);
        expect(toInteger('42')).toBe(42);
        expect(toInteger('  -42.7  ')).toBe(-42);
    });

    it('should return 0 for non-numeric values', () => {
        expect(toInteger('abc')).toBe(0);
        expect(toInteger(null)).toBe(0);
        expect(toInteger(undefined)).toBe(0);
        expect(toInteger(NaN)).toBe(0);
    });

    it('should handle edge cases', () => {
        expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
        expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
        expect(toInteger(Number.MAX_SAFE_INTEGER + 1000)).toBe(Number.MAX_SAFE_INTEGER + 1000);
        expect(toInteger(Number.MIN_SAFE_INTEGER - 1000)).toBe(Number.MIN_SAFE_INTEGER - 1000);
    });
});
