def checkXMAS(lines, size):
	num = [int(line) for line in lines]
	valid={}
	for x in range(size):
		for y in range(x + 1, size):
			sum = num[x] + num[y]
			valid[sum] = valid.get(sum, 0) + 1
	for x in range(size, len(lines)):
		if valid.get(num[x], 0) == 0:
			return num[x]
		for y in range(1, size):
			sum = num[x - size] + num[x - size + y]
			valid[sum] -= 1
			sum = num[x] + num[x - y]
			valid[sum] = valid.get(sum, 0) + 1
	return -1

def findRange(lines, size):
	target = checkXMAS(lines, size)
	num = [int(line) for line in lines]
	start = 0
	sum = 0
	for end in range(len(lines)):
		sum += num[end]
		while sum > target:
			sum -= num[start]
			start += 1
		if sum == target and start != end:
			set = num[start:end+1]
			return min(set) + max(set)


def main():
    with open('input/day09.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{checkXMAS(lines, 25)}')
    print(f'Part 2:{findRange(lines, 25)}')

if __name__ == "__main__":
    main()