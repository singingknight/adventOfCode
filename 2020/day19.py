import re


cache = {}
charRe = re.compile("\"(.)\"")
def buildRule(ruleLines, ix, fix):
    if ix in cache:
        return cache[ix]
    ruleLine = ruleLines[ix]
    if match := charRe.match(ruleLine):
        return match.group(1)
    rule = "(?:"
    delim = ""
    for orPart in ruleLine.split("|"):
        rule += delim + "(?:"
        delim = "|"
        for rulePart in orPart.strip().split(" "):
            rule += buildRule(ruleLines, int(rulePart), fix)
        rule += ")"
    rule += ")"
    if fix and ix == 8:
        rule += "+"
    if fix and ix == 11:
        outer = "(?:"
        outer += rule
        for _ in range(4):
            rule = "(?:" + cache[42] + rule + cache[31] + ")"
            outer += "|" + rule
        outer += ")"
        rule = outer
    cache[ix]=rule
    return rule

def buildRuleRe(lines, fix):
    ruleLines = {}
    for line in lines:
        if line == "":
            break
        ix, line = line.split(":")
        ruleLines[int(ix)] = line.strip()
    rule0 = buildRule(ruleLines, 0, fix)
    return re.compile(f'^{rule0}$')

def validCount(lines, fix=False):
    cache.clear()
    ruleRe = buildRuleRe(lines, fix)
    count = 0
    for line in lines:
        count += 1 if ruleRe.match(line) else 0
    return count

def main():
    with open('input/day19.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{validCount(lines)}')
    print(f'Part 2:{validCount(lines, True)}')

if __name__ == "__main__":
    main()