import itertools
from functools import reduce


def mult2020Perm(set, size):
    for k in itertools.permutations(set, size-1):
        s = sum(k)
        if (2020-s) in set:
            return reduce(lambda x, y: x*y, k, 2020-s)

            
def main():
    with open('input/day01.txt') as f:
        numbers = [int(line.rstrip()) for line in f]
    inputSet = set(numbers)
    print(f'Part 1:{mult2020Perm(inputSet, 2)}')
    print(f'Part 2:{mult2020Perm(inputSet, 3)}')


if __name__ == "__main__":
    main()
