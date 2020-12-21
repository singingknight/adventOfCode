import re

def sumMem(lines):
    andTrans = "".maketrans("X","1")
    orTrans = "".maketrans("X","0")
    andMask = 0
    orMask = 0
    mem = {}
    maskRe = re.compile("^mask = ([X01]+)$")
    memRe = re.compile("^mem\\[(\\d+)\\] = (\\d+)$")
    for line in lines:
        match = maskRe.match(line)
        if match:
            andMask = int(match.group(1).translate(andTrans), base=2)
            orMask = int(match.group(1).translate(orTrans), base=2)
            continue
        match = memRe.match(line)
        if match:
            key = int(match.group(1))
            value = int(match.group(2))
            value = value & andMask
            value = value | orMask
            mem[key] = value
    return sum(mem.values())

def maskedValues(key, mask):
    if "X" in mask:
        return maskedValues(key, mask.replace("X", "0", 1)) + maskedValues(key, mask.replace("X", "1", 1))
    return [key | int(mask, base=2)]

def sumMem2(lines):
    startTrans = "".maketrans("X0","01")
    maskRe = re.compile("^mask = ([X01]+)$")
    memRe = re.compile("^mem\\[(\\d+)\\] = (\\d+)$")
    mem = {}
    for line in lines:
        match = maskRe.match(line)
        if match:
            mask = match.group(1)
            continue
        match = memRe.match(line)
        if match:
            value = int(match.group(2))
            startMask = int(mask.translate(startTrans), base=2)
            startKey = int(match.group(1)) & startMask
            keys = maskedValues(startKey, mask)
            for key in keys:
                mem[key]=value
    return sum(mem.values())

def main():
    with open('input/day14.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{sumMem(lines)}')
    print(f'Part 2:{sumMem2(lines)}')

if __name__ == "__main__":
    main()