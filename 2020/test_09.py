from day09 import checkXMAS, findRange

lines = [
'35',
'20',
'15',
'25',
'47',
'40',
'62',
'55',
'65',
'95',
'102',
'117',
'150',
'182',
'127',
'219',
'299',
'277',
'309',
'576'
]
def test_part1():
	assert(checkXMAS(lines, 5) == 127)

def test_part2():
	assert(findRange(lines, 5) == 62)

