def memory(starting, end):
    mem = {}
    turn = 0
    start = [int(x) for x in starting.split(",")]
    startLen = len(start)
    for turn in range(1, end+1):
        last = nextNum if turn > startLen else start[turn-1]
        nextNum = turn - mem.get(last, turn)
        mem[last] = turn
    return last

def main():
    with open('input/day15.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{memory(lines[0],2020)}')
    print(f'Part 2:{memory(lines[0],30000000)}')

if __name__ == "__main__":
    main()
