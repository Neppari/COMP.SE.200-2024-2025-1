import reduce from "../src/reduce";

describe("reduce", () => {
    it("reduces an array to a single value", () => {
        const array = [1, 2, 3, 4];
        const sum = reduce(array, (acc, val) => acc + val, 0);
        expect(sum).toBe(10);
    });
});