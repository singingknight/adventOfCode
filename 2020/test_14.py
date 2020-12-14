from day14 import sumMem, sumMem2

def test_part1():
    lines = [
'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
'mem[8] = 11',
'mem[7] = 101',
'mem[8] = 0'
    ]
    assert(sumMem(lines) == 165)

def test_part2():
    lines = [
'mask = 000000000000000000000000000000X1001X',
'mem[42] = 100',
'mask = 00000000000000000000000000000000X0XX',
'mem[26] = 1'
    ]
    assert(sumMem2(lines) == 208)
