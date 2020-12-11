from copy import deepcopy

def isPlace(places, x, y, c):
    return places[y][x] == c

def countAdjacent(places, adjacent, c):
    count = 0
    for x, y in adjacent:
        if isPlace(places, x, y, c):
            count += 1
    return count  

def getChangable(places, sight, maxCount):
    directions = [
        (-1,-1),
        (-1, 0),
        (-1, 1),
        (0, -1),
        (0, 1),
        (1, -1),
        (1, 0),
        (1, 1)
    ]
    changeable = []
    for x in range(len(places[0])):
        for y in range(len(places)):
            if isPlace(places, x, y, "#"):
                adjacent = []
                for direction in directions:
                    x1, y1 = x, y
                    while True:
                        x1 += direction[1]
                        y1 += direction[0]
                        if x1 < 0 or x1 >= len(places[0]):
                            break
                        if y1 < 0 or y1 >= len(places):
                            break
                        if isPlace(places, x1, y1, "#"):
                            adjacent.append((x1, y1))
                            break
                        if not sight:
                            break
                if len(adjacent) >= maxCount:
                    changeable.append((x, y, adjacent))
    return changeable

def getCount(places, c):
    count = 0
    for x in range(len(places[0])):
        for y in range(len(places)):
            if isPlace(places, x, y, c):
                count += 1
    return count

def change(places, changable, maxCount):
    new = deepcopy(places)
    changed = False
    for x, y, adjacent in changable:
        if isPlace(places, x, y, "#") and countAdjacent(places, adjacent, "#")>=maxCount:
            new[y][x] = "L"
            changed = True
        if isPlace(places, x, y, "L") and countAdjacent(places, adjacent, "#") == 0:
            new[y][x] = "#"
            changed = True
    return (new, changed)

def countWhenStable(lines, sight, maxCount):
    trans  = "".maketrans("L", "#")
    places = [list(line.translate(trans)) for line in lines]
    changeable = getChangable(places, sight, maxCount)
    while True:
        places, changed = change(places, changeable, maxCount)
        if not changed:
            break
    return getCount(places, "#")

def main():
    with open('input/day11.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{countWhenStable(lines, False, 4)}')
    print(f'Part 1:{countWhenStable(lines, True, 5)}')

if __name__ == "__main__":
    main()