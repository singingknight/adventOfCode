import Intcode from "../src/Intcode";
class Day04 {
    list:number[]=[];
    isValid(n:number, extra:boolean) {
        const s=n.toString();
        const matches = s.match(/(.)\1+/g);
        if (!matches) return false;
        if (extra && !matches.some(m=>m.length==2)) return false;
        const digits=s.split('');
        for(let i=1;i<digits.length;i++) {
            if(digits[i]<digits[i-1])
                return false;
        }
        return true;
    }
    buildList(start:number, end:number, extra:boolean) {
        for (let i=start;i<=end;i++) {
            if (this.isValid(i, extra)) {
                this.list.push(i);
            }
        }
    }
    getCount() {
        return this.list.length;
    }
}
describe("Day 04", () => {
    var testCount = (start,end, extra, expected) => {
        var target = new Day04();
        target.buildList(start, end, extra);
        var result = target.getCount();
        expect(result).toEqual(expected);
    }
    it("count", () => {
        testCount(111111,111111,false,1);
        testCount(223450,223450,false,0);
        testCount(123789,123789,false,0);
        testCount(171309,643603,false,1625);
    });
    it("with extra check", () => {
        testCount(112233,112233,true,1);
        testCount(123789,123789,true,0);
        testCount(123444,123444,true,0);
        testCount(111122,111122,true,1);
        testCount(171309,643603,true,1111);
    });
});
