from day08 import Pgm

lines = [
'nop +0',
'acc +1',
'jmp +4',
'acc +3',
'jmp -3',
'acc -99',
'acc +1',
'jmp -4',
'acc +6'
]

def test_part1():
    pgm = Pgm(lines)
    pgm.run(stopOnLoop=True)
    assert(pgm.acc == 5)

def test_part2():
    pgm = Pgm(lines)
    pgm.fix()
    pgm.run(stopOnLoop=True)
    assert(pgm.acc == 8)