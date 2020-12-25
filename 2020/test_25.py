from day25 import getLoopSize, transform

def test_part1():
    assert(getLoopSize(5764801)==8)
    assert(transform(7,8)==5764801)
    assert(getLoopSize(17807724)==11)
    assert(transform(7,11)==17807724)
    assert(transform(5764801, getLoopSize(17807724))==14897079)