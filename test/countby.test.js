//Created with chatGPT 5 mini

import countBy from '../src/countby.js';

describe('countBy', () => {
    test("should handle example case correctly", () => {
        const users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'betty', 'active': true },
            { 'user': 'fred', 'active': false }
        ];
        const result = countBy(users, value => value.active);
        expect(result).toEqual({ 'true': 2, 'false': 1 });
    });
});