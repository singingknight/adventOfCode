import re


def validPwds(lines):
    valid = []
    r = re.compile('(?P<min>\\d+)-(?P<max>\\d+) (?P<char>.): (?P<pwd>.+)')
    for l in lines:
        m = r.match(l)
        if m:
            cnt = list(m.group('pwd')).count(m.group('char'))
            if cnt >= int(m.group('min')) and cnt <= int(m.group('max')):
                valid.append(m.group('pwd'))
    return valid


def validPwdCount(lines):
    return len(validPwds(lines))


def validPwds2(lines):
    valid = []
    r = re.compile('(?P<min>\\d+)-(?P<max>\\d+) (?P<char>.): (?P<pwd>.+)')
    for l in lines:
        m = r.match(l)
        if m:
            pwd = m.group('pwd')
            c = m.group('char')
            c1 = pwd[int(m.group('min'))-1]
            c2 = pwd[int(m.group('max'))-1]
            if (c1 == c or c2 == c) and c1 != c2:
                valid.append(pwd)
    return valid


def validPwdCount2(lines):
    return len(validPwds2(lines))


def main():
    with open('input/day02.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{validPwdCount(lines)}')
    print(f'Part 2:{validPwdCount2(lines)}')


if __name__ == "__main__":
    main()    