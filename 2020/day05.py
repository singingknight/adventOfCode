trans  = "".maketrans("FBLR", "0101")
def getSeatNum(line):
    return int(line.translate(trans), base=2)

def getRowSeat(line):
    seatNum = getSeatNum(line)
    return (seatNum // 8, seatNum % 8)

def findFirstEmptySeat(seats):
    seatSet = set(seats)
    for seat in range(min(seats), max(seats)):
        if seat not in seatSet:
            return seat

def main():
    with open('input/day05.txt') as f:
        lines = [line.rstrip() for line in f]
    seats = [getSeatNum(line) for line in lines]
    print(f'Part 1:{max(seats)}')
    print(f'Part 2:{findFirstEmptySeat(seats)}')


if __name__ == "__main__":
    main()