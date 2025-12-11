//Created with chatGPT 5 mini

import filter from '../../src/filter.js';

describe('filter (AI recommended tests)', () => {
    it('returns objects matching predicate', () => {
        const users = [
            { user: 'barney', active: true },
            { user: 'fred', active: false }
        ];

        const result = filter(users, ({ active }) => active);
        expect(result).toEqual([{ user: 'barney', active: true }]);
    });
});