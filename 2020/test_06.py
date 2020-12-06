from day06 import buildGroups, groupSum

lines = [
'abc',
'',
'a',
'b',
'c',
'',
'ab',
'ac',
'',
'a',
'a',
'a',
'a',
'',
'b'
]

def test_part1():
    groups = buildGroups(lines)
    assert(len(groups) == 5)
    assert(groupSum(groups) == 11)

def test_part2():
    groups = buildGroups(lines, True)
    assert(len(groups) == 5)
    assert(groupSum(groups) == 6)
