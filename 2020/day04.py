import re


def buildPassports(lines):
    passports = []
    passport = None
    for line in lines:
        if line == '':
            passport = None
            continue
        if passport == None:
            passport = {}
            passports.append(passport)
        for part in line.split(' '):
            key, val = part.split(':')
            passport[key]=val
    return passports

def countValidPassports(passports, checkProps=False):
    count = 0
    yearRe = re.compile('^\\d{4}$')
    hgtInRe = re.compile('^(\d+)in$')
    hgtCmRe = re.compile('^(\d+)cm$')
    hclRe = re.compile('^#[0-9a-f]{6}$')
    eclRe = re.compile('^(amb|blu|brn|gry|grn|hzl|oth)$')
    pidRe = re.compile('^\\d{9}$')
    for passport in passports:
        valid = True
        for key in ['byr','iyr','eyr','hgt','hcl','ecl','pid']:
            if not key in passport:
                valid = False
                break
        if not valid:
            continue
        if checkProps:
            if not yearRe.match(passport['byr']):
                continue
            year = int(passport['byr'])
            if year < 1920 or year > 2002:
                continue
            if not yearRe.match(passport['iyr']):
                continue
            year = int(passport['iyr'])
            if year < 2010 or year > 2020:
                continue
            if not yearRe.match(passport['eyr']):
                continue
            year = int(passport['eyr'])
            if year < 2020 or year > 2030:
                continue
            m = hgtCmRe.match(passport['hgt'])
            if m:
                cm = int(m.group(1))
                if cm < 150 or cm > 193:
                    continue
            else:
                m = hgtInRe.match(passport['hgt'])
                if m:
                    i = int(m.group(1))
                    if i < 59 or i > 76:
                        continue
                else:
                    continue
            if not hclRe.match(passport['hcl']):
                continue
            if not eclRe.match(passport['ecl']):
                continue
            if not pidRe.match(passport['pid']):
                continue
        count = count + 1
    return count


def main():
    with open('input/day04.txt') as f:
        lines = [line.rstrip() for line in f]
    passports = buildPassports(lines)
    print(f'Part 1:{countValidPassports(passports)}')
    print(f'Part 2:{countValidPassports(passports, True)}')

if __name__ == "__main__":
    main()