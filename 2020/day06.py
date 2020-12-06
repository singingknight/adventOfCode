from functools import reduce

def buildGroups(lines):
    groups = []
    group = None
    for line in lines:
        if line == '':
            group = None
            continue
        if group == None:
            group = set()
            groups.append(group)
        for q in line:
            group.add(q)
    return groups

def buildGroupsAll(lines):
    groups = []
    group = None
    for line in lines:
        if line == '':
            group = None
            continue
        person = set()
        for q in line:
            person.add(q)
        if group == None:
            group = set(person)
            groups.append(group)
        for q in group.difference(person):
            group.remove(q)
    return groups

def groupSum(groups):
    return reduce(lambda x, y:x+len(y), groups, 0)

def main():
    with open('input/day06.txt') as f:
        lines = [line.rstrip() for line in f]
    groups = buildGroups(lines)
    print(f'Part 1:{groupSum(groups)}')
    groups = buildGroupsAll(lines)
    print(f'Part 2:{groupSum(groups)}')

if __name__ == "__main__":
    main()
