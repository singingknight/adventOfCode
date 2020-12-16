import re

def readInput(lines):
    fields = {}
    tickets = []
    inFields = True
    for line in lines:
        if line == '':
            inFields = False
            continue
        if inFields:
            (key, rest) = line.split(": ")
            values = set()
            for group in rest.split(" or "):
                (start,end) = group.split("-")
                values.update(range(int(start), int(end)+1))
            fields[key] = values
        else:
            if ':' in  line:
                continue
            values = [int(x) for x in line.split(",")]
            tickets.append(values)
    valid = set()
    for values in fields.values():
        valid = valid.union(values)
    return (fields, tickets, valid)

def errorRate(lines):
    (_, tickets, valid) = readInput(lines)
    rate = 0
    for ticket in tickets:
        for value in ticket:
            if not value in valid:
                rate += value
    return rate

def removeKey(possible, key, ix):
    possible[ix].remove(key)
    if len(possible[ix]) == 1:
        key2 = next(iter(possible[ix]))
        for ix2 in range(0, len(possible)):
            if ix2 != ix and key2 in possible[ix2]:
                removeKey(possible, key2, ix2)

def getFieldNums(fields, tickets, valid):
    possible = [set(fields.keys()) for _ in range(0, len(tickets[0]))]
    for ticket in tickets:
        isValid = True
        for value in ticket:
            if value not in valid:
                isValid = False
                continue
        if not isValid:
            continue
        for ix, value in enumerate(ticket):
            remove = []
            for key in possible[ix]:
                if value not in fields[key]:
                    remove.append(key)
            for key in remove:
                removeKey(possible, key, ix)
    result = {}
    for ix in range(0, len(possible)):
        result[next(iter(possible[ix]))]=ix
    return result

def multiply(lines, regex):
    (fields, tickets, valid) = readInput(lines)
    fieldNums = getFieldNums(fields, tickets, valid)
    r = re.compile(regex)
    result = 1
    for key, ix in fieldNums.items():
        if r.match(key):
            result *= tickets[0][ix]
    return result

def main():
    with open('input/day16.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{errorRate(lines)}')
    print(f'Part 2:{multiply(lines, "^departure")}')

if __name__ == "__main__":
    main()