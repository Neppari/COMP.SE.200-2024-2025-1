import ceil from '../src/ceil.js';
import assert from 'assert';

describe('ceil', function () {
    it('ceil(4.006) should return 5', function () {
        assert.strictEqual(ceil(4.006), 5);
    });

    it('ceil(6.004, 2) should return 6.01', function () {
        assert.strictEqual(ceil(6.004, 2), 6.01);
    });

    it('ceil(6040, -2) should return 6100', function () {
        assert.strictEqual(ceil(6040, -2), 6100);
    });
});