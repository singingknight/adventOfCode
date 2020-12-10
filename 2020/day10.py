from functools import reduce

def multDiff(lines, diffs):
    adapters = sorted([int(line) for line in lines])
    adapters.append(adapters[-1]+3)
    diffCount = {}
    prev = 0
    for adapter in adapters:
        diff = adapter - prev
        diffCount[diff] = diffCount.get(diff, 0) + 1
        prev = adapter
    return reduce(lambda x, y: x * diffCount.get(y, 0), diffs, 1)

cache = {}
def _arrangements(adapterSet, test):
    if test == 0:
        return 1
    if not test in adapterSet:
        return 0
    if test in cache:
        return cache[test]
    sum = 0
    for diff in range(1,3+1):
        sum += _arrangements(adapterSet, test-diff)
    cache[test] = sum
    return sum

def arrangements(lines):
    cache.clear()
    adapters = sorted([int(line) for line in lines])
    adapters.append(adapters[-1]+3)
    return _arrangements(set(adapters), adapters[-1])


def main():
    with open('input/day10.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{multDiff(lines, [1, 3])}')
    print(f'Part 1:{arrangements(lines)}')

if __name__ == "__main__":
    main()