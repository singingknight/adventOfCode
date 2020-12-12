class Ship:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.wx = 10
        self.wy = 1
        self.dir = 1

    def navigate(self, lines):
        for line in lines:
            inst = line[0]
            num = int(line[1:])
            if inst == 'F':
                inst = 'NESW'[self.dir]
            if inst == 'N':
                self.y += num
            if inst == 'S':
                self.y -= num
            if inst == 'E':
                self.x += num
            if inst == 'W':
                self.x -= num
            if inst == 'R':
                self.dir = (self.dir + (num // 90)) % 4
            if inst == 'L':
                self.dir = (self.dir - (num // 90)) % 4

    def navigate2(self, lines):
        for line in lines:
            inst = line[0]
            num = int(line[1:])
            if inst == 'F':
                self.x += num * self.wx
                self.y += num * self.wy
            if inst == 'N':
                self.wy += num
            if inst == 'S':
                self.wy -= num
            if inst == 'E':
                self.wx += num
            if inst == 'W':
                self.wx -= num
            if inst == 'R':
                for _ in range(num // 90 % 4):
                    self.wx, self.wy = self.wy, -self.wx
            if inst == 'L':
                for _ in range(num // 90 % 4):
                    self.wx, self.wy = -self.wy, self.wx

    def getManhattan(self):
        return abs(self.x)+abs(self.y)

def getManhattan(lines):
    ship = Ship()
    ship.navigate(lines)
    return ship.getManhattan()

def getManhattan2(lines):
    ship = Ship()
    ship.navigate2(lines)
    return ship.getManhattan()

def main():
    with open('input/day12.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{getManhattan(lines)}')
    print(f'Part 2:{getManhattan2(lines)}')

if __name__ == "__main__":
    main()
