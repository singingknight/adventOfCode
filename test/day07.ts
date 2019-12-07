import Intcode from "../src/Intcode";
class Day07 {
    async simpleGetTrust(pgm, state: number[]) {
        let signal = 0;
        for (let i = 0; i < state.length; i++) {
            const computer = new Intcode();
            computer.load(pgm);
            computer.setInput([state[i], signal]);
            await computer.run();
            [signal] = computer.getOutput();
        }
        return signal;
    }
    async loopingGetTrust(pgm, state: number[]) {
        const computers = [];
        const waitingInputs: (number[])[] = [];
        const inputPromises: ((n: number) => void)[] = [];
        let signal = 0;
        const getInput = (computer): Promise<number> => {
            if (waitingInputs[computer].length > 0) {
                let n = waitingInputs[computer].shift();
                console.log("Got input", computer, n);
                return Promise.resolve(n);
            }
            return new Promise<number>((resolve) => {
                console.log("Waiting for input", computer);
                inputPromises[computer] = resolve;
            });
        };
        const provideInput = (computer, n) => {
            signal = n;
            const target = (computer+1)%state.length
            if (inputPromises[target] !== undefined) {
                const promise = inputPromises[target];
                inputPromises[target]=undefined;
                promise(n);
            } else {
                waitingInputs[target].push(n);
            }
        }
        for (let i = 0; i < state.length; i++) {
            let computer = i;
            computers[i] = new Intcode();
            computers[i].load(pgm);
            computers[i].setInputFunc(() => {
                return getInput(computer);
            });
            waitingInputs[i] = [state[i]];
            computers[i].setOutputFunc(n => {
                provideInput(computer, n);
            });
        }
        waitingInputs[0].push(0);
        await Promise.all(computers.map(c => c.run()));
        return signal;
    }
    async permute(input: number[], func: (input: number[]) => Promise<void>, permutation: number[] = []) {
        for (let i = 0; i < input.length; i++) {
            let x = input.splice(i, 1)[0];
            permutation.push(x);
            if (input.length == 0) {
                await func(permutation);
            }
            await this.permute(input, func, permutation);
            input.splice(i, 0, x);
            permutation.pop();
        }
    };
    async getMaxTrust(pgm, settings = [0, 1, 2, 3, 4], trustFunc = this.simpleGetTrust) {
        let max = await this.simpleGetTrust(pgm, settings);
        await this.permute(settings, async (input) => {
            const trust = await trustFunc(pgm, input);
            max = Math.max(max, trust);
        });
        return max;
    }
}
describe("Day 07", () => {
    var testSimple = async (pgm, expected) => {
        var target = new Day07();
        const result = await target.getMaxTrust(pgm);
        expect(result).toEqual(expected);
    }
    var testLooping = async (pgm, expected) => {
        var target = new Day07();
        const result = await target.getMaxTrust(pgm, [5,6,7,8,9], target.loopingGetTrust);
        expect(result).toEqual(expected);
    }
    it("simple", async () => {
        await testSimple([3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0], 43210);
        await testSimple([3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23,
            101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0], 54321);
        await testSimple([3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
            1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0], 65210);
        await testSimple(pgm, 43812);
    });
    it("looping", async () => {
        await testLooping([3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
            27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5], 139629729);
        await testLooping([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
            -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
            53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10], 18216);
        await testLooping(pgm, 59597414);
    });
    const pgm = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 30, 55, 80, 101, 118, 199, 280, 361, 442, 99999, 3, 9, 101, 4, 9, 9, 4, 9, 99, 3, 9, 101, 4, 9, 9, 1002, 9, 4, 9, 101, 4, 9, 9, 1002, 9, 5, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 2, 9, 101, 3, 9, 9, 102, 4, 9, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 101, 5, 9, 9, 102, 3, 9, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 102, 4, 9, 9, 1001, 9, 3, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99];
});
