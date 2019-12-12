interface Point3 {
    x: number;
    y?: number;
    z?: number;
}
interface Moon {
    pos: Point3;
    vel: Point3;
}
class Day11 {
    moons: Moon[];
    load(scan: Point3[]) {
        this.moons = scan.map(s => {
            return { pos: s, vel: { x: 0, y: 0, z: 0 } };
        });
    }
    updateVelocity(moons = this.moons) {
        const outer = [...moons];
        while (outer.length > 0) {
            const origin = outer.shift();
            const inner = [...outer];
            while (inner.length > 0) {
                const current = inner.shift();
                for (let k in current.pos) {
                    if (origin.pos[k] > current.pos[k]) {
                        origin.vel[k]--;
                        current.vel[k]++;
                    }
                    if (origin.pos[k] < current.pos[k]) {
                        origin.vel[k]++;
                        current.vel[k]--;
                    }
                }
            }
        }
    }
    applyVelocity(moons = this.moons) {
        moons.forEach(m => {
            for (let k in m.pos) {
                m.pos[k] += m.vel[k];
            }
        });
    }
    simulate(steps: number, moons = this.moons) {
        for (let step = 0; step < steps; step++) {
            this.updateVelocity(moons);
            this.applyVelocity(moons);
        }
    }
    getEnergy(vec: Point3) {
        let energy = 0;
        for (let k in vec) {
            energy += Math.abs(vec[k]);
        }
        return energy;
    }
    getTotalEnergy() {
        return this.moons.reduce((p, m) => {
            return p + this.getEnergy(m.pos) * this.getEnergy(m.vel);
        }, 0);
    }
    format(moons) {
        return moons.map(moon => `${moon.pos.x},${moon.vel.x}`).join(";");
    }
    getPartialLoopCount(moons) {
        const prev = new Map<string, number>();
        for (let i = 0; ; i++) {
            this.simulate(1, moons);
            const key = this.format(moons);
            if (prev.has(key)) {
                return i - prev.get(key);
            }
            prev.set(key, i);
        }
        return 0;
    }
    factors(n: number) {
        const factors = [];
        let i = 2;
        while (n > 1) {
            for (; i <= n; i++) {
                if (n % i === 0) {
                    factors.push(i);
                    n = n / i;
                    break;
                }
            }
        }
        return factors;
    }
    getCommon(x, y) {
        const fx = this.factors(x);
        const fy = this.factors(y);
        return fy.reduce((p, f) => {
            let index = fx.indexOf(f);
            if (index === -1) {
                return p * f;
            }
            fx.splice(index, 1);
            return p;
        }, x);
    }
    getLoopCount() {
        let x = this.getPartialLoopCount(
            this.moons.map(m => {
                return { pos: { x: m.pos.x }, vel: { x: 0 } };
            })
        );
        let y = this.getPartialLoopCount(
            this.moons.map(m => {
                return { pos: { x: m.pos.y }, vel: { x: 0 } };
            })
        );
        let z = this.getPartialLoopCount(
            this.moons.map(m => {
                return { pos: { x: m.pos.z }, vel: { x: 0 } };
            })
        );
        return this.getCommon(this.getCommon(x, y), z);
    }
}
describe("Day 11", () => {
    var testEnergy = async (scan, steps, expected) => {
        var target = new Day11();
        target.load(scan);
        target.simulate(steps);
        const result = target.getTotalEnergy();
        expect(result).toEqual(expected);
    };
    var testLoop = async (scan, expected) => {
        var target = new Day11();
        target.load(scan);
        const result = target.getLoopCount();
        expect(result).toEqual(expected);
    };
    it("Energy", () => {
        testEnergy(
            [
                { x: -1, y: 0, z: 2 },
                { x: 2, y: -10, z: -7 },
                { x: 4, y: -8, z: 8 },
                { x: 3, y: 5, z: -1 }
            ],
            10,
            179
        );
        testEnergy(
            [
                { x: -8, y: -10, z: 0 },
                { x: 5, y: 5, z: 10 },
                { x: 2, y: -7, z: 3 },
                { x: 9, y: -8, z: -3 }
            ],
            100,
            1940
        );
        testEnergy(scan, 1000, 10664);
    });
    it("Loop", () => {
        testLoop(
            [
                { x: -1, y: 0, z: 2 },
                { x: 2, y: -10, z: -7 },
                { x: 4, y: -8, z: 8 },
                { x: 3, y: 5, z: -1 }
            ],
            2772
        );
        testLoop(
            [
                { x: -8, y: -10, z: 0 },
                { x: 5, y: 5, z: 10 },
                { x: 2, y: -7, z: 3 },
                { x: 9, y: -8, z: -3 }
            ],
            4686774924
        );
        testLoop(scan, 303459551979256);
    });
    const scan = [
        { x: -16, y: 15, z: -9 },
        { x: -14, y: 5, z: 4 },
        { x: 2, y: 0, z: 6 },
        { x: -3, y: 18, z: 9 }
    ];
});
