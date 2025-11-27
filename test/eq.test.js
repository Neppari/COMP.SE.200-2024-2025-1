import eq from '../src/eq.js';

describe('eq', () => {
    it('compares objects and primitives correctly', () => {
        const object = { 'a': 1 };
        const other = { 'a': 1 };

        expect(eq(object, object)).toBe(true);
        expect(eq(object, other)).toBe(false);
        expect(eq('a', 'a')).toBe(true);
        expect(eq('a', Object('a'))).toBe(false);
        expect(eq(NaN, NaN)).toBe(true);
    });
});