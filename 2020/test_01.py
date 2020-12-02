from day01 import mult2020Perm

testSet = { 1721, 979, 366, 299, 675, 1456 }

def test_part1():
    assert(mult2020Perm(testSet, 2) == 514579)


def test_part2():
    assert(mult2020Perm(testSet, 3) == 241861950)