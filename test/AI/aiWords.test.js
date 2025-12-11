import words from '../../src/words.js';

describe('words (AI recommended tests)', () => {
  describe('default behavior without custom pattern', () => {
    test('splits simple ASCII sentence into words, ignoring punctuation', () => {
      const input = 'fred, barney, & pebbles';
      const result = words(input);

      expect(result).toEqual(['fred', 'barney', 'pebbles']);
    });

    test('returns empty array for empty string', () => {
      expect(words('')).toEqual([]);
    });

    test('returns empty array for string with only spaces', () => {
      expect(words('   ')).toEqual([]);
    });

    test('handles letters and numbers as separate words', () => {
      const input = 'foo bar 123';
      const result = words(input);

      expect(result).toEqual(['foo', 'bar', '123']);
    });

    test('handles apostrophes in words', () => {
      const input = "Fred's book isn't here";
      const result = words(input);

      expect(result).toEqual(["Fred's", 'book', "isn't", 'here']);
    });
  });

  describe('behavior with custom RegExp pattern', () => {
    test('uses custom pattern instead of default word detection', () => {
      const input = 'fred, barney, & pebbles';
      const pattern = /[^, ]+/g;

      const result = words(input, pattern);

      expect(result).toEqual(['fred', 'barney', '&', 'pebbles']);
    });

    test('returns empty array when pattern matches nothing', () => {
      const input = '---';
      const pattern = /[a-z]+/g;

      const result = words(input, pattern);

      expect(result).toEqual([]);
    });
  });

  describe('Unicode and emoji handling', () => {
    test('handles accented characters as single words', () => {
      const input = 'café naïve façade';
      const result = words(input);

      expect(result).toEqual(['café', 'naïve', 'façade']);
    });

    test('treats emoji as separate words', () => {
      const input = 'café 😀 test';
      const result = words(input);

      expect(result).toEqual(['café', '😀', 'test']);
    });

    test('treats emoji ZWJ sequences as a single word', () => {
      const familyEmoji = '👩‍👩‍👧‍👦';
      const input = `${familyEmoji} family`;
      const result = words(input);

      expect(result).toEqual([familyEmoji, 'family']);
    });
  });
});

