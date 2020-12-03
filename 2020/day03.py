def isTree(map, row, col):
    width = len(map[0])
    return map[row][col % width] == "#"

def numberOfTrees(map, right, down):
    trees = 0
    col = 0
    for row in range(0, len(map), down):
        if isTree(map, row, col):
            trees = trees + 1
        col = col + right
    return trees

def numberOfTreesMult(map, slopes):
    mult = 1
    for slope in slopes:
        right, down = slope
        mult = mult * numberOfTrees(map, right, down)
    return mult

def main():
    with open('input/day03.txt') as f:
        map = [line.rstrip() for line in f]
    print(f'Part 1: {numberOfTrees(map, 3, 1)}')
    print(f'''Part 2: {numberOfTreesMult(map, [
        (1, 1),
        (3, 1),
        (5, 1),
        (7, 1),
        (1, 2)
    ])
    }''')

if __name__ == "__main__":
    main()