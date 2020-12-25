from numpy import log
from itertools import count

def transform(subject, loopSize):
    result = 1
    for _ in range(loopSize):
        result = result * subject % 20201227
    return result

def getLoopSize(key):
    test = 1
    i = 0
    while test != key:
        test = test * 7 % 20201227
        i += 1
    return i

def main():
    with open('input/day25.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{transform(int(lines[1]),getLoopSize(int(lines[0])))}')

if __name__ == "__main__":
    main()