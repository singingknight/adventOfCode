def evalOp(left, op, right):
    if op == "+":
        return left + right
    return left * right

def eval(line, adv, inMult=False):
    left = 0
    op = '+'
    right = 0
    while line:
        char, line = line[0], line[1:]
        if char in "0123456789":
            right = right * 10 + int(char)
            continue
        if char == " ":
            continue
        if adv and char == "*":
            if inMult:
                line = char + line
                break
            temp, line = eval(line, adv, True)
            left = (left + right) * temp
            right = 0
            continue
        if char in "+*":
            left = evalOp(left, op, right)
            op = char
            right = 0
            continue
        if char == ")":
            if inMult:
                line = char+line
            break
        if char == "(":
            right, line = eval(line, adv)
    return (evalOp(left, op, right), line)


def calc(line, adv=False):
    return eval(line, adv)[0]

def calcSum(lines, adv=False):
    return sum([calc(line, adv) for line in lines])

def main():
    with open('input/day18.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{calcSum(lines)}')
    print(f'Part 2:{calcSum(lines, True)}')

if __name__ == "__main__":
    main()