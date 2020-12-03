from day03 import numberOfTrees, numberOfTreesMult

map = [
'..##.......',
'#...#...#..',
'.#....#..#.',
'..#.#...#.#',
'.#...##..#.',
'..#.##.....',
'.#.#.#....#',
'.#........#',
'#.##...#...',
'#...##....#',
'.#..#...#.#'
]

def test_part1():
    assert(numberOfTrees(map, 3, 1) == 7)

def test_part2():
    assert(numberOfTrees(map, 1, 1) == 2)
    assert(numberOfTrees(map, 3, 1) == 7)
    assert(numberOfTrees(map, 5, 1) == 3)
    assert(numberOfTrees(map, 7, 1) == 4)
    assert(numberOfTrees(map, 1, 2) == 2)
    assert(numberOfTreesMult(map, 
    [
        (1, 1),
        (3, 1),
        (5, 1),
        (7, 1),
        (1, 2)
    ]) == 336)
