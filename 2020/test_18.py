from day18 import calc, calcSum

lines = [
'2 * 3 + (4 * 5)',
'5 + (8 * 3 + 9 + 3 * 4 * 3)',
'5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
'((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
]
def test_part1():
    assert(calc('1 + 2 * 3 + 4 * 5 + 6')==71)
    assert(calc('1 + (2 * 3) + (4 * (5 + 6))')==51)
    assert(calc(lines[0])==26)
    assert(calc(lines[1])==437)
    assert(calc(lines[2])==12240)
    assert(calc(lines[3])==13632)
    assert(calcSum(lines)==26+437+12240+13632)

def test_part2():
    assert(calc('1 + 2 * 3 + 4 * 5 + 6', True)==231)
    assert(calc('1 + (2 * 3) + (4 * (5 + 6))', True)==51)
    assert(calc('2 * 3 + (4 * 5)', True)==46)
    assert(calc('5 + (8 * 3 + 9 + 3 * 4 * 3)', True)==1445)
    assert(calc('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', True)==669060)
    assert(calc('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', True)==23340)