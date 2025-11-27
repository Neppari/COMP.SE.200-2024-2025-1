//Based on part 1 test plan documentation

import words from '../src/words.js';

describe('words', () => {
    // Tests from part 1 test plan
    test('should throw TypeError if string is not a string', () => {
        expect(() => words(123)).toThrow(TypeError);
        expect(() => words(null)).toThrow(TypeError);
        expect(() => words(undefined)).toThrow(TypeError);
    });

    test('should output empty if pattern is not a RegExp or string', () => {
        expect(words('test', 123)).toEqual([]);
        expect(words('test', null)).toEqual([]);
        expect(words('test', undefined)).toEqual(['test']);
    });

    test('should handle unicode correctly with undefined pattern', () => {
        expect(words('Hello, 世界')).toEqual(['Hello', '世界']);
    });

    test('should handle ascii correctly with undefined pattern', () => {
        expect(words('Hello, world!')).toEqual(['Hello', 'world']);
    });

    test('should handle valid patterns and inputs', () => {
        expect(words('one two three', /\w+/g)).toEqual(['one', 'two', 'three']);
        expect(Array.from(words('one two three', /\w+/))).toEqual(['one']);
        expect(words('one-two-three', /[^-]+/g)).toEqual(['one', 'two', 'three']);
    });

    //Given examples in the source code
    test('should split a string into words using default pattern', () => {
        expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    test('should split a string into words using a custom pattern', () => {
        expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    });

    // Additional tests to ensure robustness
    test('should handle strings with alphanumeric characters', () => {
        expect(words('alpha123beta')).toEqual(['alpha', '123', 'beta']);
        expect(words('alpha 123 beta')).toEqual(['alpha', '123', 'beta']);
    });

    test('should handle strings with mixed case and camelCase', () => {
        expect(words('camelCase')).toEqual(['camel', 'Case']);
        expect(words('PascalCase')).toEqual(['Pascal', 'Case']);
    });

    test('should return an empty array for empty strings', () => {
        expect(words('')).toEqual([]);
    });

    test('should return an empty array if no matches are found', () => {
        expect(words('-')).toEqual([]);
    });

});
