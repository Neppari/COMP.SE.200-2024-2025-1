//Created with chatGPT 5 mini

import clamp from '../src/clamp.js';

describe('clamp', () => {
    test('should clamp number within the specified range', () => {
        expect(clamp(-10, -5, 5)).toBe(-5);
        expect(clamp(10, -5, 5)).toBe(5);
    });
});