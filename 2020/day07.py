import re


def getBags(lines):
	bags = {}
	outerRe = re.compile("^(.+) bags contain (.+).$")
	innerRe = re.compile("^\\s*((\\d+)|no) (.+) bag(s)?$")
	for line in lines:
		m = outerRe.match(line)
		if m:
			outer = m.group(1)
			contains = m.group(2)
			contents = []
			for inner in contains.split(","):
				m = innerRe.match(inner)
				if m:
					count = 0 if m.group(1) == 'no' else int(m.group(2))
					contents.append((count, m.group(3)))
				else:
					print(f'Inner error {inner}')
			bags[outer] = contents
		else:
			print(f'Outer error {line}')
	return bags

def getContainsCount(bags, test):
	outers = {test}
	hasNew = True
	while hasNew:
		hasNew = False
		for bag in bags:
			if bag not in outers:
				for _, inner in bags[bag]:
					if inner in outers:
						outers.add(bag)
						hasNew = True
						break
	outers.remove(test)
	return len(outers)

contentCounts={}
def getContentCount(bags, outer):
	if outer in contentCounts:
		return contentCounts[outer]
	total = 0
	for count, inner in bags[outer]:
		if count > 0:
			total += count * (getContentCount(bags, inner) + 1)
	contentCounts[outer]=total
	return total

def main():
    with open('input/day07.txt') as f:
        lines = [line.rstrip() for line in f]
    bags = getBags(lines)
    print(f"Part 1:{getContainsCount(bags, 'shiny gold') }")
    print(f"Part 2:{getContentCount(bags, 'shiny gold') }")
	

if __name__ == "__main__":
    main()