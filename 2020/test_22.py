from day22 import winnerScore, getDecks, play

lines = [
'Player 1:',
'9',
'2',
'6',
'3',
'1',
'',
'Player 2:',
'5',
'8',
'4',
'7',
'10'
]

def test_part1():
    assert(winnerScore(lines) == 306)

def test_part2():
    decks = getDecks([
'Player 1:',
'43',
'19',
'',
'Player 2:',
'2',
'29',
'14'
    ])
    _, winner = play(decks, True)
    assert(winner == 0)
    assert(winnerScore(lines, True) == 291)