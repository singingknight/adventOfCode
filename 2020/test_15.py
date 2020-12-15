from day15 import memory

def test_part1():
    assert(memory("0,3,6", 2020) == 436)
    assert(memory("1,3,2", 2020) == 1)
    assert(memory("2,1,3", 2020) == 10)
    assert(memory("1,2,3", 2020) == 27)
    assert(memory("2,3,1", 2020) == 78)
    assert(memory("3,2,1", 2020) == 438)
    assert(memory("3,1,2", 2020) == 1836)
    