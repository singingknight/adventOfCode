from day02 import validPwdCount, validPwdCount2

testList = [
'1-3 a: abcde',
'1-3 b: cdefg',
'2-9 c: ccccccccc'
]

def test_part1():
    assert(validPwdCount(testList) == 2)

def test_part2():
    assert(validPwdCount2(testList) == 1)
