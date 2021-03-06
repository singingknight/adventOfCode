import Intcode from "../src/Intcode";
interface Point {
    x: number;
    y: number;
}
interface Panel {
    pos: Point;
    color: number;
}
class Day11 {
    brain = new Intcode();
    panels = new Map<string, Panel>();
    position = { x: 0, y: 0 };
    direction = 0;
    cmdType = 0;
    directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 }
    ];
    formatPoint(p: Point) {
        return `${p.x},${p.y}`;
    }
    getPos(pos?: Point) {
        pos = pos || this.position;
        return this.formatPoint(pos);
    }
    paint(color) {
        this.panels.set(this.getPos(), {
            pos: { x: this.position.x, y: this.position.y },
            color: color
        });
    }
    read(pos?: Point) {
        pos = pos || this.position;
        const panel = this.panels.get(this.getPos(pos)) || {
            pos: this.position,
            color: 0
        };
        return panel.color;
    }
    load(pgm) {
        this.brain.load(pgm);
        this.brain.setInputFunc(() => {
            return Promise.resolve(this.read());
        });
        this.brain.setOutputFunc(n => {
            switch (this.cmdType) {
                case 0:
                    this.paint(n);
                    break;
                case 1:
                    this.direction =
                        (4 + this.direction + (n === 0 ? -1 : 1)) % 4;
                    const move = this.directions[this.direction];
                    this.position.x += move.x;
                    this.position.y += move.y;
                    break;
            }
            this.cmdType = 1 - this.cmdType;
        });
    }
    initPanel() {
        this.paint(1);
    }
    async run() {
        await this.brain.run();
    }
    getPanelCount() {
        return this.panels.size;
    }
    getPanels() {
        const topLeft = { x: 0, y: 0 };
        const bottomRight = { x: 0, y: 0 };
        this.panels.forEach(p => {
            if (p.pos.x < topLeft.x) topLeft.x = p.pos.x;
            if (p.pos.y < topLeft.y) topLeft.y = p.pos.y;
            if (p.pos.x > bottomRight.x) bottomRight.x = p.pos.x;
            if (p.pos.y > bottomRight.y) bottomRight.y = p.pos.y;
        });
        const lines = [];
        for (let y = bottomRight.y; y >= topLeft.y; y--) {
            const chars = [];
            for (let x = topLeft.x; x <= bottomRight.x; x++) {
                chars.push(this.read({ x: x, y: y }) === 1 ? "X" : ".");
            }
            lines.push(chars.join(""));
        }
        return lines;
    }
}
describe("Day 11", () => {
    var testPgm = async (pgm, expected) => {
        var target = new Day11();
        target.load(pgm);
        await target.run();
        const result = target.getPanelCount();
        expect(result).toEqual(expected);
    };
    var testPgm2 = async (pgm, expected) => {
        var target = new Day11();
        target.load(pgm);
        target.initPanel();
        await target.run();
        const result = target.getPanels();
        expect(result).toEqual(expected);
    };
    it("Part1", async () => {
        await testPgm(pgm, 2293);
    });
    it("Part2", async () => {
        await testPgm2(pgm, [
            "..XX..X..X.X.....XX..XXX..XXX...XX..X......",
            ".X..X.X..X.X....X..X.X..X.X..X.X..X.X......",
            ".X..X.XXXX.X....X....X..X.X..X.X..X.X......",
            ".XXXX.X..X.X....X....XXX..XXX..XXXX.X......",
            ".X..X.X..X.X....X..X.X....X.X..X..X.X......",
            ".X..X.X..X.XXXX..XX..X....X..X.X..X.XXXX..."
        ]);
    });
    const pgm = [
        3,
        8,
        1005,
        8,
        319,
        1106,
        0,
        11,
        0,
        0,
        0,
        104,
        1,
        104,
        0,
        3,
        8,
        1002,
        8,
        -1,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        108,
        1,
        8,
        10,
        4,
        10,
        1001,
        8,
        0,
        28,
        2,
        1008,
        7,
        10,
        2,
        4,
        17,
        10,
        3,
        8,
        102,
        -1,
        8,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        1008,
        8,
        0,
        10,
        4,
        10,
        1002,
        8,
        1,
        59,
        3,
        8,
        1002,
        8,
        -1,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        1008,
        8,
        0,
        10,
        4,
        10,
        1001,
        8,
        0,
        81,
        1006,
        0,
        24,
        3,
        8,
        1002,
        8,
        -1,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        108,
        0,
        8,
        10,
        4,
        10,
        102,
        1,
        8,
        105,
        2,
        6,
        13,
        10,
        1006,
        0,
        5,
        3,
        8,
        1002,
        8,
        -1,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        108,
        0,
        8,
        10,
        4,
        10,
        1002,
        8,
        1,
        134,
        2,
        1007,
        0,
        10,
        2,
        1102,
        20,
        10,
        2,
        1106,
        4,
        10,
        1,
        3,
        1,
        10,
        3,
        8,
        102,
        -1,
        8,
        10,
        101,
        1,
        10,
        10,
        4,
        10,
        108,
        1,
        8,
        10,
        4,
        10,
        1002,
        8,
        1,
        172,
        3,
        8,
        1002,
        8,
        -1,
        10,
        1001,
        10,
        1,
        10,
        4,
        10,
        108,
        1,
        8,
        10,
        4,
        10,
        101,
        0,
        8,
        194,
        1,
        103,
        7,
        10,
        1006,
        0,
        3,
        1,
        4,
        0,
        10,
        3,
        8,
        1002,
        8,
        -1,
        10,
        1001,
        10,
        1,
        10,
        4,
        10,
        1008,
        8,
        1,
        10,
        4,
        10,
        101,
        0,
        8,
        228,
        2,
        109,
        0,
        10,
        1,
        101,
        17,
        10,
        1006,
        0,
        79,
        3,
        8,
        1002,
        8,
        -1,
        10,
        1001,
        10,
        1,
        10,
        4,
        10,
        108,
        0,
        8,
        10,
        4,
        10,
        1002,
        8,
        1,
        260,
        2,
        1008,
        16,
        10,
        1,
        1105,
        20,
        10,
        1,
        3,
        17,
        10,
        3,
        8,
        1002,
        8,
        -1,
        10,
        1001,
        10,
        1,
        10,
        4,
        10,
        1008,
        8,
        1,
        10,
        4,
        10,
        1002,
        8,
        1,
        295,
        1,
        1002,
        16,
        10,
        101,
        1,
        9,
        9,
        1007,
        9,
        1081,
        10,
        1005,
        10,
        15,
        99,
        109,
        641,
        104,
        0,
        104,
        1,
        21101,
        387365733012,
        0,
        1,
        21102,
        1,
        336,
        0,
        1105,
        1,
        440,
        21102,
        937263735552,
        1,
        1,
        21101,
        0,
        347,
        0,
        1106,
        0,
        440,
        3,
        10,
        104,
        0,
        104,
        1,
        3,
        10,
        104,
        0,
        104,
        0,
        3,
        10,
        104,
        0,
        104,
        1,
        3,
        10,
        104,
        0,
        104,
        1,
        3,
        10,
        104,
        0,
        104,
        0,
        3,
        10,
        104,
        0,
        104,
        1,
        21102,
        3451034715,
        1,
        1,
        21101,
        0,
        394,
        0,
        1105,
        1,
        440,
        21102,
        3224595675,
        1,
        1,
        21101,
        0,
        405,
        0,
        1106,
        0,
        440,
        3,
        10,
        104,
        0,
        104,
        0,
        3,
        10,
        104,
        0,
        104,
        0,
        21101,
        0,
        838337454440,
        1,
        21102,
        428,
        1,
        0,
        1105,
        1,
        440,
        21101,
        0,
        825460798308,
        1,
        21101,
        439,
        0,
        0,
        1105,
        1,
        440,
        99,
        109,
        2,
        22101,
        0,
        -1,
        1,
        21102,
        1,
        40,
        2,
        21101,
        0,
        471,
        3,
        21101,
        461,
        0,
        0,
        1106,
        0,
        504,
        109,
        -2,
        2106,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        109,
        2,
        3,
        10,
        204,
        -1,
        1001,
        466,
        467,
        482,
        4,
        0,
        1001,
        466,
        1,
        466,
        108,
        4,
        466,
        10,
        1006,
        10,
        498,
        1102,
        1,
        0,
        466,
        109,
        -2,
        2105,
        1,
        0,
        0,
        109,
        4,
        2101,
        0,
        -1,
        503,
        1207,
        -3,
        0,
        10,
        1006,
        10,
        521,
        21101,
        0,
        0,
        -3,
        21202,
        -3,
        1,
        1,
        22102,
        1,
        -2,
        2,
        21101,
        1,
        0,
        3,
        21102,
        540,
        1,
        0,
        1105,
        1,
        545,
        109,
        -4,
        2105,
        1,
        0,
        109,
        5,
        1207,
        -3,
        1,
        10,
        1006,
        10,
        568,
        2207,
        -4,
        -2,
        10,
        1006,
        10,
        568,
        22102,
        1,
        -4,
        -4,
        1106,
        0,
        636,
        22102,
        1,
        -4,
        1,
        21201,
        -3,
        -1,
        2,
        21202,
        -2,
        2,
        3,
        21102,
        587,
        1,
        0,
        1105,
        1,
        545,
        21201,
        1,
        0,
        -4,
        21101,
        0,
        1,
        -1,
        2207,
        -4,
        -2,
        10,
        1006,
        10,
        606,
        21102,
        0,
        1,
        -1,
        22202,
        -2,
        -1,
        -2,
        2107,
        0,
        -3,
        10,
        1006,
        10,
        628,
        22102,
        1,
        -1,
        1,
        21102,
        1,
        628,
        0,
        105,
        1,
        503,
        21202,
        -2,
        -1,
        -2,
        22201,
        -4,
        -2,
        -4,
        109,
        -5,
        2106,
        0,
        0
    ];
});
