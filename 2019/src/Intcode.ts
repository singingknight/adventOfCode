export default class Intcode {
  memory: number[] = [];
  output: number[] = [];
  inputFunc: () => Promise<number>;
  outputFunc: (number) => void = (n) => {
    this.output.push(n);
  }
  pc = 0;
  relBase = 0;
  load(pgm: number[]) {
    pgm.forEach((v, adr) => this.memory[adr] = v);
  }
  setInput(input: number[] | undefined) {
    let i = 0;
    this.inputFunc = async () => {
      return input[i++];
    }
  }
  getOutput() {
    return this.output;
  }
  setInputFunc(f: () => Promise<number>) {
    this.inputFunc = f;
  }
  setOutputFunc(f: (n: number) => void) {
    this.outputFunc = f;
  }
  splitCommand(cmd: number) {
    const opCode = cmd % 100;
    const m1 = Math.trunc(cmd / 100) % 10;
    const m2 = Math.trunc(cmd / 1000) % 10;
    const m3 = Math.trunc(cmd / 10000) % 10;
    return [opCode, m1, m2, m3];
  }
  async run() {
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
          this.set(this.pc + 1, await this.inputFunc(), m1);
          opCodeLen = 2;
          break;
        case 4:
          this.outputFunc(this.read(this.pc + 1, m1));
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
        case 9:
          this.relBase += this.read(this.pc + 1, m1);
          opCodeLen = 2;
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
    switch (mode)
    {
      case 0:
        pos = this.memory[pos];
        break;
      case 2:
        pos = this.relBase + this.memory[pos];
        break;
    }
    return this.memory[pos] || 0;
  }
  set(pos: number, value: number, mode: number = 1) {
    switch (mode)
    {
      case 0:
        pos = this.memory[pos];
        break;
      case 2:
        pos = this.relBase + this.memory[pos];
        break;
    }
    this.memory[pos] = value;
  }
}
