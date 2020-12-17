class ConwayCube:
    def __init__(self, lines, runFour=False):
        self.state = set()
        self.dim = (
            len(lines), -1,
            len(lines[0]), -1,
            1, -1,
            1, -1)
        z = 0
        f = 0
        for x, line in enumerate(lines):
            for y, char in enumerate(line):
                if char == '#':
                    self.dim = self._newDim(self.dim, x, y, z, f)
                    self.state.add((x,y,z,f))
        self.runFour = runFour

    def _newDim(self, old, x, y, z, f):
        (x1, x2, y1, y2, z1, z2, f1, f2) = old
        return (
            min(x1, x), max(x2, x),
            min(y1, y), max(y2, y),
            min(z1, z), max(z2, z),
            min(f1, f), max(f2, f)
        )

    def _countNeighbors(self, x, y, z, f):
        sum = 0
        for dx in range(-1, 1+1):
            for dy in range(-1, 1+1):
                for dz in range(-1, 1+1):
                    for df in range(-1, 1+1):
                        sum += 1 if (x+dx, y+dy, z+dz, f+df) in self.state else 0
        sum -= 1 if (x, y, z, f) in self.state else 0
        return sum
    
    def executeCycle(self):
        newState = set()
        (x1, x2, y1, y2, z1, z2, f1, f2) = self.dim
        self.dim = (x2+1, x1-1, y2+1, y1-1, z2+1, z1-1, f2+1, f1-1)
        for x in range(x1-1, x2+1+1):
            for y in range(y1-1, y2+1+1):
                for z in range(z1-1, z2+1+1):
                    for f in range(f1-1, f2+1+1):
                        if f != 0 and not self.runFour:
                            continue
                        neighbors = self._countNeighbors(x, y, z, f)
                        if (x, y, z, f) in self.state:
                            if neighbors == 2 or neighbors == 3:
                                self.dim = self._newDim(self.dim, x, y, z, f)
                                newState.add((x,y,z,f))
                        else:
                            if neighbors == 3:
                                self.dim = self._newDim(self.dim, x, y, z, f)
                                newState.add((x,y,z,f))
        self.state = newState

def aliveCount(lines, cycles, runFour=False):
    cube = ConwayCube(lines, runFour)
    for _ in range(0, cycles):
        cube.executeCycle()
    return len(cube.state)

def main():
    with open('input/day17.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{aliveCount(lines, 6)}')
    print(f'Part 2:{aliveCount(lines, 6, True)}')

if __name__ == "__main__":
    main()
