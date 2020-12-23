def orig_play(cups, rounds):
    prev = {}
    for cup in cups:
        i = int(cup)
        while True:
            i = (i - 1) % 10
            c = str(i)
            if c in cups:
                prev[cup]=c
                break

    for _ in range(rounds):
        destination = prev[cups[0]]
        while True:
            try:
                i = cups.index(destination, 4)
                break
            except ValueError:
                destination = prev[destination]
        cups = cups[4:i+1]+cups[1:4]+cups[i+1:]+cups[0:1]
    return cups

def orig_getLabel(cups, rounds):
    cups = orig_play(cups, rounds)
    i = cups.index("1")
    return cups[i+1:]+cups[:i]

def play(start, cupCount, rounds):
    nextCup = {}
    current = int(start[0])-1
    prev = current
    for cup in start[1:]:
        cup = int(cup)-1
        nextCup[prev]=cup
        prev = cup
    for cup in range(len(start), cupCount):
        nextCup[prev]=cup
        prev = cup
    nextCup[prev] = current
    for _ in range(rounds):
        pickups = []
        prev = current
        for _ in range(3):
            prev = nextCup[prev]
            pickups.append(prev)
        destination = (current - 1) % cupCount
        while destination in pickups:
            destination = (destination - 1) % cupCount
        nextCup[current]=nextCup[pickups[2]]
        nextCup[pickups[2]]=nextCup[destination]
        nextCup[destination]=pickups[0]
        current = nextCup[current]
    return nextCup


def getLabel(cups, rounds):
    nextCup = play(cups, 9, rounds)
    label = ""
    next = nextCup[0]
    while next != 0:
        label += str(next+1)
        next = nextCup[next]
    return label

def getStars(cups, cupCount, rounds):
    nextCup = play(cups, cupCount, rounds)
    first = nextCup[0]
    second = nextCup[first]
    return (first+1)*(second+1)

def main():
    with open('input/day23.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{getLabel(lines[0], 100)}')
    print(f'Part 2:{getStars(lines[0], 1000000, 10000000)}')

if __name__ == "__main__":
    main()