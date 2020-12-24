import regex

def getOffset(line):
    x = 0
    y = 0
    offsets = {
        "nw": (-1, -1),
        "ne": (0, -1),
        "w": (-1, 0),
        "e": (1, 0),
        "sw": (-1, 1),
        "se": (0, 1)
    }
    r = regex.compile('^(n?s?(?:e|w))*$')
    for move in r.match(line).captures(1):
        offset = offsets[move]
        x += offset[0]+offset[1]%2*y%2
        y += offset[1]
    return (x, y)

def getneighbors(tiles, x, y):
    offsets = [
        [
            (-1, -1),
            (0, -1),
            (-1, 0),
            (1, 0),
            (-1, 1),
            (0, 1)
        ],
        [
            (0, -1),
            (1, -1),
            (-1, 0),
            (1, 0),
            (0, 1),
            (1, 1)
        ]
    ]
    offset = offsets[y%2]
    count = 0
    for dx, dy in offset:
        count += tiles.get((x+dx, y+dy), 0)
    return count

def conway(tiles):
    xs = []
    ys = []
    for x,y in tiles.keys():
        if tiles[(x,y)] == 1:
            xs.append(x)
            ys.append(y)
    newTiles = {}
    for x in range(min(xs)-1, max(xs)+2):
        for y in range(min(ys)-1, max(ys)+2):
            neighbors = getneighbors(tiles, x, y)
            if tiles.get((x,y),0) == 1:
                if neighbors == 1 or neighbors == 2:
                    newTiles[(x,y)]=1
            else:
                if neighbors == 2:
                    newTiles[(x,y)]=1
    return newTiles

def blackCount(lines, days=0):
    tiles = {}
    for line in lines:
        offset = getOffset(line)
        tiles[offset] = 1 - tiles.get(offset, 0)
    for _ in range(days):
        tiles = conway(tiles)
    return sum(tiles.values())

def main():
    with open('input/day24.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{blackCount(lines)}')
    print(f'Part 2:{blackCount(lines, 100)}')

if __name__ == "__main__":
    main()