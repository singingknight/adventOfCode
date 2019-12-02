import Intcode from "../src/Intcode";
class Day02 {
    static getState(pgm: number[], output: number) {
        for (let noun = 0; noun < 100; noun++)
            for (let verb = 0; verb < 100; verb++) {
                var target = new Intcode();
                target.load(pgm);
                target.set(1, noun);
                target.set(2, verb);
                target.run();
                var result = target.read(0);
                if (result === output) {
                    return noun * 100 + verb;
                }
            }
    }
}
describe("Day 02", () => {
    var testPgm = (pgm, pf, pos, expected) => {
        var target = new Intcode();
        target.load(pgm);
        if (pf) pf(target);
        target.run();
        var result = target.read(pos);
        expect(result).toEqual(expected);
    }
    var testState = (pgm, output, expected) => {
        let result = Day02.getState(pgm, output);
        expect(result).toEqual(expected);
    }
    it("pgm", () => {
        testPgm([1, 0, 0, 0, 99], null, 0, 2);
        testPgm([2, 3, 0, 3, 99], null, 3, 6);
        testPgm([1, 1, 1, 4, 99, 5, 6, 0, 99], null, 0, 30);
        testPgm(pgm02,
            (t:Intcode) => { t.set(1, 12); t.set(2, 2) },
            0, 4138687)
    });
    it("state", () => {
        testState(pgm02, 4138687, 1202);
        testState(pgm02, 19690720, 6635);
    })

});
const pgm02 = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 1, 19, 10, 23, 2, 13, 23, 27, 1, 5, 27, 31, 2, 6, 31, 35, 1, 6, 35, 39, 2, 39, 9, 43, 1, 5, 43, 47, 1, 13, 47, 51, 1, 10, 51, 55, 2, 55, 10, 59, 2, 10, 59, 63, 1, 9, 63, 67, 2, 67, 13, 71, 1, 71, 6, 75, 2, 6, 75, 79, 1, 5, 79, 83, 2, 83, 9, 87, 1, 6, 87, 91, 2, 91, 6, 95, 1, 95, 6, 99, 2, 99, 13, 103, 1, 6, 103, 107, 1, 2, 107, 111, 1, 111, 9, 0, 99, 2, 14, 0, 0];