//Created with chatGPT 5 mini

import reduce from "../src/reduce";

describe("reduce", () => {
    it("reduces an array to a single value", () => {
        expect(reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    });

    it("groups object keys by their values", () => {
        const input = { a: 1, b: 2, c: 1 };
        const result = reduce(
            input,
            (acc, value, key) => {
                (acc[value] || (acc[value] = [])).push(key);
                return acc;
            },
            {}
        );

        expect(Object.keys(result).sort()).toEqual(["1", "2"]);
        expect((result["1"] || []).slice().sort()).toEqual(["a", "c"]);
        expect(result["2"]).toEqual(["b"]);
    });
});