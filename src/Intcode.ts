export default class Intcode {
  memory: number[] = [];
  pc = 0;
  load(pgm: number[]) {
    pgm.forEach((v, adr) => this.memory[adr] = v);
  }
  run() {
    while (true) {
      let opCodeLen = 4;
      switch (this.read(this.pc)) {
        case 1:
          this.setRel(this.pc + 3,
            this.readRel(this.pc + 1) + this.readRel(this.pc + 2));
          break;
        case 2:
          this.setRel(this.pc + 3,
            this.readRel(this.pc + 1) * this.readRel(this.pc + 2));
          break;
        case 99:
          return;
        default:
          throw new Error(`Error: pc=${this.pc} inst=${this.read(this.pc)}`);
      }
      this.pc += opCodeLen;
    }

  }
  readRel(pos: number) {
    return this.read(this.read(pos));
  }
  setRel(pos: number, value: number) {
    return this.set(this.read(pos), value);
  }
  read(pos: number) {
    return this.memory[pos];
  }
  set(pos: number, value: number) {
    this.memory[pos] = value;
  }
}
