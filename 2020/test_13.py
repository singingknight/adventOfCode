from day13 import nextDeparture, contest

lines = [
'939',
'7,13,x,x,59,x,31,19'
]

def test_part1():
    assert(nextDeparture(lines) == 295)

def test_part2():
    assert(contest(lines) == 1068781)