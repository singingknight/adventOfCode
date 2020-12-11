from day11 import countWhenStable

lines = [
'L.LL.LL.LL',
'LLLLLLL.LL',
'L.L.L..L..',
'LLLL.LL.LL',
'L.LL.LL.LL',
'L.LLLLL.LL',
'..L.L.....',
'LLLLLLLLLL',
'L.LLLLLL.L',
'L.LLLLL.LL'
]

def test_part1():
    assert(countWhenStable(lines, False, 4) == 37)

def test_part2():
    assert(countWhenStable(lines, True, 5) == 26)