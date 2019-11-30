class Day25 {
    getPos(row:number, col:number) {
        let pos=1;
        let inc=0;
        for (let i=0;i<row;i++,inc++) {
            pos += inc;
        }
        inc++;
        for (let i=1;i<col;i++,inc++) {
            pos += inc;
        }
        return pos;
    }
    getCode(pos:number) {
        let code = 20151125;
        const mult = 252533;
        const mod = 33554393;
        for (let i=1;i<pos;i++) {
            code = code * mult % mod;
        }
        return code;
    }
}
describe("Day 25",() => {
    var testPos = (r: number, c, expected) => {
         var target = new Day25();
         var result = target.getPos(r,c);
         expect(result).toEqual(expected);
    }
    var testCode = (r, c, expected) => {
        var target = new Day25();
        var result = target.getCode(target.getPos(r,c));
        expect(result).toEqual(expected);
   }
   it("pos", () => {
        testPos(1,1,1);
        testPos(2,1,2);
        testPos(3,1,4);
        testPos(6,1,16);
        testPos(1,2,3);
        testPos(1,6,21);
        testPos(4,3,18);
    });
    it("code", () => {
        testCode(1, 1, 20151125);
        testCode(6, 6, 27995004);
        //testCode(2981, 3075, 9132360);
    })

});