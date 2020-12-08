class Pgm:
    def __init__(self, lines):
        self.pgm = []
        for line in lines:
            instr, args = line.split(" ", 1)
            self.pgm.append((instr, args.split(",")))
        self.acc = 0
        self.pc  = 0
    
    def execute(self):
        instr, args = self.pgm[self.pc]
        if instr == "nop":
            self.pc += 1
            return
        if instr == "acc":
            self.acc += int(args[0])
            self.pc += 1
            return
        if instr == "jmp":
            self.pc += int(args[0])
            return
    
    def run(self, stopOnLoop=False):
        self.acc = 0
        self.pc  = 0
        executed = [0 for _ in range(len(self.pgm))]
        while True:
            executed[self.pc] += 1
            self.execute()
            if self.pc > len(self.pgm):
                return False
            if self.pc == len(self.pgm):
                return True
            if stopOnLoop and executed[self.pc] > 0:
                return False

    def fix(self):
        for x in range(len(self.pgm)):
            instr, args = self.pgm[x]
            if instr == "nop":
                self.pgm[x] = ("jmp", args)
                if self.run(stopOnLoop=True):
                    return
                self.pgm[x] = ("nop", args)
                continue                
            if instr == "jmp":
                self.pgm[x] = ("nop", args)
                if self.run(stopOnLoop=True):
                    return
                self.pgm[x] = ("jmp", args)

def main():
    with open('input/day08.txt') as f:
        lines = [line.rstrip() for line in f]
    pgm = Pgm(lines)
    pgm.run(stopOnLoop=True)
    print(f'Part 1:{pgm.acc}')
    pgm = Pgm(lines)
    pgm.fix()
    print(f'Part 2:{pgm.acc}')

if __name__ == "__main__":
    main()