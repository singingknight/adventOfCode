def getDecks(lines):
    decks = []
    for line in lines:
        if not line:
            continue
        if line[0] == "P":
            deck = []
            decks.append(deck)
            continue
        deck.append(int(line))
    return decks

def play(decks, isRecursive):
    oldDecks=[]
    while decks[0] and decks[1]:
        for oldDeck in oldDecks:
            if oldDeck[0] == decks[0] or oldDeck[1] == decks[1]:
                return decks, 0
        oldDecks.append((decks[0][:], decks[1][:]))
        test = []
        recurse = isRecursive
        for deck in decks:
            card = deck.pop(0)
            test.append(card)
            if len(deck)<card:
                recurse = False
        if recurse:
            _, winner = play([decks[0][:test[0]],decks[1][:test[1]]], True)
        else:
            winner = 0 if test[0] > test[1] else 1
        if winner == 0:
            decks[0].extend(test)
        else:
            decks[1].extend(reversed(test))
    return decks, 0 if decks[0] else 1

def winnerScore(lines,isRecursive=False):
    decks = getDecks(lines)
    decks, winner = play(decks,isRecursive)
    score = 0
    for ix,card in enumerate(reversed(decks[winner])):
        score += (ix+1) * card
    return score

def main():
    with open('input/day22.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{winnerScore(lines)}')
    print(f'Part 1:{winnerScore(lines, True)}')

if __name__ == "__main__":
    main()