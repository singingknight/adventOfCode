from math import gcd

def nextDeparture(lines):
    atPort = int(lines[0])
    busses = [int(n) for n in filter(lambda x: x != 'x', lines[1].split(','))]
    result = -1
    best = -1
    for bus in busses:
        departsIn = bus - atPort % bus
        if departsIn < best or best == -1:
            best = departsIn
            result = departsIn * bus
    return result

def contest(lines):
    t = 0
    lcm = 1
    ix = -1
    for part in lines[1].split(','):
        ix += 1
        if (part == 'x'):
            continue
        bus = int(part)
        while (t+ix) % bus != 0:
            t += lcm
        lcm = lcm * bus // gcd(lcm, bus)
    return t

def main():
    with open('input/day13.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{nextDeparture(lines)}')
    print(f'Part 2:{contest(lines)}')

if __name__ == "__main__":
    main()