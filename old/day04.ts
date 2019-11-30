///<reference types="jasmine"/>
import { Md5 } from 'ts-md5/dist/md5';
class Day04 {
    getCoin(input: string) {
        for (let i = 0; ; i++) {
            if ((<string>Md5.hashStr(input + i)).substr(0, 5) === '00000')
                return i;
        }
    }
    getCoin2(input: string) {
        for (let i = 0; ; i++) {
            if ((<string>Md5.hashStr(input + i)).substr(0, 6) === '000000')
                return i;
        }
    }
}
describe("Day 04", () => {
    var testGetCoin = (s, expected) => {
        var target = new Day04();
        var result = target.getCoin(s);
        expect(result).toEqual(expected);
    }
    var testGetCoin2 = (s, expected) => {
        var target = new Day04();
        var result = target.getCoin2(s);
        expect(result).toEqual(expected);
    }
    it("coin", () => {
        testGetCoin('abcdef60904', 3);
        testGetCoin('abcdef', 609043);
        testGetCoin('pqrstuv', 1048970);
        testGetCoin('yzbqklnj',282749)
        testGetCoin2('yzbqklnj',9962624)
    })
});