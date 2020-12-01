class Day16 {
    output: number[];
    pattern = [0,1,0,-1];
    executePhase(start, end) {
        const digits=this.output.map(d => null);
        for (let outDigit=start;outDigit<this.output.length;outDigit++) {
            
            let sum = 0;
            for (let inDigit=start;inDigit<this.output.length;inDigit++) {
                let digit = this.output[inDigit];
                let index = Math.floor((inDigit+1) / (outDigit+1)) % this.pattern.length;
                let factor = this.pattern[index];
                sum += digit * factor;
            }
            digits[outDigit] = Math.abs(sum)%10;
        }
        this.output = digits;
    }
    executePhases(input, phases, start, end) {
        this.output = input.split('').map(d => Number(d));
        for (let phase=0;phase<phases;phase++) {
            this.executePhase(start, end);
        }
    }
    getOutput(start,length) {
        const result = [];
        for (let i=0;i<length;i++) {
            result.push(this.output[start+i].toString());
        }
        return result.join('');
    }
}
describe("Day 16", () => {
    var testPhase = async (input, phases, start, end, expected) => {
        var target = new Day16();
        target.executePhases(input, phases, start, end);
        const result = target.getOutput(start, end);
        expect(result).toEqual(expected);
    };
    it("Part 1", async () => {
        testPhase('12345678',1,0,8,'48226158');
        testPhase('12345678',1,3,3,'261');
        testPhase('12345678',2,0,8,'34040438');
        testPhase('12345678',4,0,8,'01029498');
        testPhase('12345678',4,3,3,'294');
        testPhase('80871224585914546619083218645595',100,0,8,'24176176');
        testPhase(input,100,0,8,'42945143');
    });
    // prettier-ignore
    const input='59787832768373756387231168493208357132958685401595722881580547807942982606755215622050260150447434057354351694831693219006743316964757503791265077635087624100920933728566402553345683177887856750286696687049868280429551096246424753455988979991314240464573024671106349865911282028233691096263590173174821612903373057506657412723502892841355947605851392899875273008845072145252173808893257256280602945947694349746967468068181317115464342687490991674021875199960420015509224944411706393854801616653278719131946181597488270591684407220339023716074951397669948364079227701367746309535060821396127254992669346065361442252620041911746738651422249005412940728';
});
