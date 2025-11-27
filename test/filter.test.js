import filter from '../src/filter.js';

describe('filter', () => {
    it('filters out odd numbers from an array', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const isEven = (num) => num % 2 === 0;
        const result = filter(array, isEven);
        expect(result).toEqual([2, 4, 6]);
    });
});