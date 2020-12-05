from day05 import getSeatNum, getRowSeat

def test_part1():
    assert(getRowSeat('FBFBBFFRLR') == (44,5))
    assert(getSeatNum('FBFBBFFRLR') == 357)
    assert(getRowSeat('BFFFBBFRRR') == (70,7))
    assert(getSeatNum('BFFFBBFRRR') == 567)
    assert(getRowSeat('FFFBBBFRRR') == (14,7))
    assert(getSeatNum('FFFBBBFRRR') == 119)
    assert(getRowSeat('BBFFBBFRLL') == (102,4))
    assert(getSeatNum('BBFFBBFRLL') == 820)
