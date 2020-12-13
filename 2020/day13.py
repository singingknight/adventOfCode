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
    max = -1
    maxIx = 0
    busses = []
    ix = 0
    for x in lines[1].split(','):
        if x != 'x':
            bus = int(x)
            busses.append((bus, ix))
            if (bus > max):
                max = bus
                maxIx = ix
        ix += 1
    t = 0
    jump = 1
    for maxBus in range(len(busses)):
        match = False
        while True:
            match = True
            for bus, ix in busses[:maxBus+1]:
                if (t+ix) % bus != 0:
                    match = False
                    break
            if match:
                break
            t += jump
        newBus = busses[maxBus][0]
        jump = jump * newBus // gcd(jump, newBus)
    return t

def main():
    with open('input/day13.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{nextDeparture(lines)}')
    print(f'Part 2:{contest(lines)}')

if __name__ == "__main__":
    main()