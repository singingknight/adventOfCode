import Intcode from "../src/Intcode";
interface Point {
    x: number;
    y: number;
}
interface Panel {
    pos: Point;
    result: number;
}
class Day19 {
    brain = new Intcode();
    panels = new Map<string, Panel>();
    formatPoint(x, y) {
        return `${x},${y}`;
    }
    async test(pgm, x, y) {
        const brain = new Intcode();
        brain.load(pgm);
        brain.setInput([x, y]);
        await brain.run();
        return brain.getOutput()[0];
    }
    async getMap(pgm, size) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                this.panels.set(this.formatPoint(x, y), {
                    pos: { x: x, y: y },
                    result: await this.test(pgm, x, y)
                });
            }
        }
    }
    read(x, y) {
        const result = this.panels.get(this.formatPoint(x, y)).result
            ? "#"
            : ".";
        return result;
    }
    drawMap(size) {
        const lines = [];
        for (let y = 0; y < size; y++) {
            const chars = [];
            for (let x = 0; x < size; x++) {
                chars.push(this.read(x, y));
            }
            lines.push(chars.join(""));
        }
        console.log(lines.join("\n"));
    }
    getAffectedCount() {
        let sum = 0;
        this.panels.forEach(p => {
            sum += p.result;
        });
        return sum;
    }
    async getFirst10x10(pgm) {
        let startX = 0;
        for (let y = 0; y<10000; y++) {
            for (let x = startX; x<startX+100 ; x++) {
                const res = await this.test(pgm, x, y);
                if (res) {
                    startX = x;
                    if (y>99 &&
                        await this.test(pgm, x, y - 99) &&
                        await this.test(pgm, x + 99, y - 99) &&
                        await this.test(pgm, x + 99, y)) {
                        return x * 10000 + y - 99;
                    }
                    break;
                }
            }
        }
    }
}
describe("Day 19", () => {
    var testPgm = async (pgm, size, expected) => {
        var target = new Day19();
        await target.getMap(pgm, size);
        const result = target.getAffectedCount();
        target.drawMap(size);
        expect(result).toEqual(expected);
    };
    var testPgm2 = async (pgm, expected) => {
        var target = new Day19();
        const result = await target.getFirst10x10(pgm);
        expect(result).toEqual(expected);
    };
    it("Part 1", async () => {
        //await testPgm(pgm, 50, 220);
    });
    it("Part 2", async () => {
        await testPgm2(pgm, 10010825);
    })
    // prettier-ignore
    const pgm = [109,424,203,1,21102,1,11,0,1105,1,282,21102,18,1,0,1106,0,259,2102,1,1,221,203,1,21102,31,1,0,1105,1,282,21101,38,0,0,1106,0,259,21002,23,1,2,22101,0,1,3,21102,1,1,1,21101,57,0,0,1105,1,303,1202,1,1,222,20102,1,221,3,20102,1,221,2,21102,1,259,1,21102,80,1,0,1105,1,225,21102,72,1,2,21101,91,0,0,1105,1,303,1201,1,0,223,20102,1,222,4,21101,0,259,3,21102,1,225,2,21102,1,225,1,21102,1,118,0,1105,1,225,20102,1,222,3,21101,104,0,2,21101,0,133,0,1105,1,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1106,0,259,1201,1,0,223,20101,0,221,4,20102,1,222,3,21101,0,18,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,195,0,0,106,0,109,20207,1,223,2,20101,0,23,1,21102,1,-1,3,21102,214,1,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,2102,1,-4,249,22102,1,-3,1,22102,1,-2,2,22102,1,-1,3,21101,250,0,0,1105,1,225,22102,1,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21202,-2,1,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21202,-2,1,3,21101,0,343,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21102,384,1,0,1106,0,303,1105,1,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21202,1,1,-4,109,-5,2105,1,0];
});
