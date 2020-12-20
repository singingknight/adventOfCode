import re
from functools import reduce
from collections import Counter

tileRe = re.compile('Tile *(\\d+):')

def getTiles(lines):
    tiles = {}
    no = -1
    for line in lines:
        if not line:
            no = -1
            continue
        if no == -1:
            match = tileRe.match(line)
            no = int(match.group(1))
            tile = {}
            tiles[no] = tile
            tile["lines"]=[]
            continue
        tile["lines"].append(line)
    return tiles

def getCorners(tiles):
    edgeCounts = {}
    for _, tile in tiles.items():

        left, right = "", ""
        lines = tile["lines"]
        for line in lines:
            left += line[0]
            right += line[-1]
        edges = (lines[0], right, lines[-1], left)
        sortedEdges = []
        for edge in edges:
            sortedEdge = sorted([edge, "".join(reversed(edge))])[0]
            edgeCounts[sortedEdge] = edgeCounts.get(sortedEdge, 0) + 1
            sortedEdges.append(sortedEdge)
        tile["sortedEdges"] = sortedEdges
    corners = []
    for no, tile in tiles.items():
        outerCount = 0
        for sortedEdge in tile["sortedEdges"]:
            if edgeCounts[sortedEdge] == 1:
                outerCount += 1
        if outerCount == 2:
            corners.append(no)
    return corners, edgeCounts

def cornerMult(lines):
    tiles = getTiles(lines)
    corners, _ = getCorners(tiles)
    return reduce(lambda x, y: x*y, corners, 1)

def rotateMap(lines):
    newLineCount = len(lines[0])
    newLines = ["" for _ in lines[0]]
    for line in lines:
        for ix, char in enumerate(line):
            newLines[newLineCount-ix-1] +=char
    return newLines

def rotateTile(tile):
    tile["lines"] = rotateMap(tile["lines"])
    sortedEdges = tile["sortedEdges"]
    tile["sortedEdges"] = (
        sortedEdges[1],
        sortedEdges[2],
        sortedEdges[3],
        sortedEdges[0],
        )
def flipMap(lines):
    newLines = []
    for line in lines:
        newLines.append("".join(reversed(line)))
    return newLines

def flipTile(tile):
    tile["lines"] = flipMap(tile["lines"])
    sortedEdges = tile["sortedEdges"]
    tile["sortedEdges"] = (
        sortedEdges[0],
        sortedEdges[3],
        sortedEdges[2],
        sortedEdges[1],
        )

def getArrangement(tiles, corners, edgeCounts):
    arrangement = []
    x = 0
    y = 0
    tilesLeft = set(tiles.keys())
    for _ in range(len(tiles)):
        left = "" if x == 0 else tiles[arrangement[y][x-1]]["sortedEdges"][1]
        top = "" if y == 0 else tiles[arrangement[y-1][x]]["sortedEdges"][2]
        for key in tilesLeft:
            match = False
            tile = tiles[key]
            sortedEdges = tile["sortedEdges"]
            for ix, firstEdge in enumerate(sortedEdges):
                if firstEdge == top or (top == "" and edgeCounts[firstEdge] == 1):
                    otherEdge = sortedEdges[(ix-1)%4]
                    if otherEdge == left or (left == "" and edgeCounts[otherEdge] == 1):
                        match = True
                        flip = False
                        break
                    otherEdge = sortedEdges[(ix+1)%4]
                    if otherEdge == left or (left == "" and edgeCounts[otherEdge] == 1):
                        match = True
                        flip = True
                        break
            if not match:
                continue
            for _ in range(ix):
                rotateTile(tile)
            if flip:
                flipTile(tile)
            if x == 0:
                arrangement.append([])
            arrangement[y].append(key)
            if edgeCounts[tile["sortedEdges"][1]]==1:
                y += 1
                x = 0
            else:
                x += 1
            break
        tilesLeft.remove(key)
    return arrangement

def buildMap(tiles, arrangement):
    map = []
    for line in arrangement:
        lines = ["" for _ in tiles[line[0]]["lines"]]
        for key in line:
            for ix, tileLine in enumerate(tiles[key]["lines"]):
                lines[ix]+=tileLine[1:-1]
        map.extend(lines[1:-1])
    return map

def markMonsters(map):
    moster = [
        (0,1),
        (1,2),
        (4,2),
        (5,1),
        (6,1),
        (7,2),
        (10,2),
        (11,1),
        (12,1),
        (13,2),
        (16,2),
        (17,1),
        (18,0),
        (18,1),
        (19,1)
    ]
    for _ in range(2):
        for _ in range(4):
            for y in range(0, len(map)-3):
                for x in range(0, len(map[0])-20):

                    isMonster = True
                    for dx, dy in moster:
                        if map[y+dy][x+dx]==".":
                            isMonster = False
                            break
                    if not isMonster:
                        continue
                    for dx, dy in moster:
                        line = map[y+dy]
                        map[y+dy] = line[:(x+dx)]+"O"+line[(x+dx+1):]
            map = rotateMap(map)
        map = flipMap(map)
    return map

def getRoughness(lines):
    tiles = getTiles(lines)
    corners, edgeCounts = getCorners(tiles)
    arrangement = getArrangement(tiles, corners, edgeCounts)
    map = buildMap(tiles, arrangement)
    map = markMonsters(map)
    return Counter("".join(map))['#']

def main():
    with open('input/day20.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{cornerMult(lines)}')
    print(f'Part 2:{getRoughness(lines)}')

if __name__ == "__main__":
    main()