from day17 import aliveCount

lines = [
'.#.',
'..#',
'###'
]

def test_part1():
    assert(aliveCount(lines, 6) == 112)

def test_part2():
    assert(aliveCount(lines, 6, True) == 848)