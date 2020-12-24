from day24 import blackCount, getOffset

lines = [
'sesenwnenenewseeswwswswwnenewsewsw',
'neeenesenwnwwswnenewnwwsewnenwseswesw',
'seswneswswsenwwnwse',
'nwnwneseeswswnenewneswwnewseswneseene',
'swweswneswnenwsewnwneneseenw',
'eesenwseswswnenwswnwnwsewwnwsene',
'sewnenenenesenwsewnenwwwse',
'wenwwweseeeweswwwnwwe',
'wsweesenenewnwwnwsenewsenwwsesesenwne',
'neeswseenwwswnwswswnw',
'nenwswwsewswnenenewsenwsenwnesesenew',
'enewnwewneswsewnwswenweswnenwsenwsw',
'sweneswneswneneenwnewenewwneswswnese',
'swwesenesewenwneswnwwneseswwne',
'enesenwswwswneneswsenwnewswseenwsese',
'wnwnesenesenenwwnenwsewesewsesesew',
'nenewswnwewswnenesenwnesewesw',
'eneswnwswnwsenenwnwnwwseeswneewsenese',
'neswnwewnwnwseenwseesewsenwsweewe',
'wseweeenwnesenwwwswnew'
]

def test_part1():
    assert(getOffset("")==(0,0))
    assert(getOffset("esew")==(0, 1))
    assert(getOffset("nwwswee")==(0, 0))
    assert(blackCount(lines)==10)

def test_part2():
    assert(blackCount(lines)==10)
    assert(blackCount(lines,1)==15)
    assert(blackCount(lines,100)==2208)
