export default class Intcode {
  memory: number[] = [];
  input: number[] = [];
  output: number[] = [];
  pc = 0;
  load(pgm: number[]) {
    pgm.forEach((v, adr) => this.memory[adr] = v);
  }
  setInput(input: number[] | undefined) {
    this.input = input || [];
  }
  getOutput() {
    return this.output;
  }
  splitCommand(cmd: number) {
    const opCode = cmd % 100;
    const m1 = Math.trunc(cmd / 100) % 10;
    const m2 = Math.trunc(cmd / 1000) % 10;
    const m3 = Math.trunc(cmd / 10000) % 10;
    return [opCode, m1, m2, m3];
  }
  run() {
    while (true) {
      let opCodeLen = 4;
      const [opCode, m1, m2, m3] = this.splitCommand(this.read(this.pc));
      switch (opCode) {
        case 1:
          this.set(this.pc + 3,
            this.read(this.pc + 1, m1) + this.read(this.pc + 2, m2), m3);
          break;
        case 2:
          this.set(this.pc + 3,
            this.read(this.pc + 1, m1) * this.read(this.pc + 2, m2), m3);
          break;
        case 3:
          this.set(this.pc + 1, this.input.shift(), m1);
          opCodeLen = 2;
          break;
        case 4:
          this.output.push(this.read(this.pc + 1, m1));
          opCodeLen = 2;
          break;
        case 5:
          if (this.read(this.pc + 1, m1) !== 0) {
            this.pc = this.read(this.pc + 2, m2);
            opCodeLen = 0;
          } else {
            opCodeLen = 3;
          }
          break;
        case 6:
          if (this.read(this.pc + 1, m1) === 0) {
            this.pc = this.read(this.pc + 2, m2);
            opCodeLen = 0;
          } else {
            opCodeLen = 3;
          }
          break;
        case 7:
          this.set(this.pc + 3
            , this.read(this.pc + 1, m1) < this.read(this.pc + 2, m2) ? 1 : 0
            , m3);
          break;
        case 8:
          this.set(this.pc + 3
            , this.read(this.pc + 1, m1) === this.read(this.pc + 2, m2) ? 1 : 0
            , m3);
          break;
        case 99:
          return;
        default:
          throw new Error(`Error: pc=${this.pc} inst=${this.read(this.pc)}`);
      }
      this.pc += opCodeLen;
    }

  }
  read(pos: number, mode: number = 1) {
    pos = mode === 0 ? this.memory[pos] : pos;
    return this.memory[pos];
  }
  set(pos: number, value: number, mode: number = 1) {
    pos = mode === 0 ? this.memory[pos] : pos;
    this.memory[pos] = value;
  }
}
