from day12 import getManhattan, getManhattan2

lines = [
'F10',
'N3',
'F7',
'R90',
'F11'
]

def test_part1():
    assert(getManhattan(lines)==25)

def test_part2():
    assert(getManhattan2(lines)==286)